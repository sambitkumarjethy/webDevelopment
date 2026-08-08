import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import AuditLog from "../models/AuditLog.js";
import { resolvePermissions } from "../utils/permissions.js";
import {
  signAccessToken,
  generateRefreshTokenValue,
  hashToken,
  refreshExpiryDate,
} from "../utils/tokens.js";

const REFRESH_COOKIE = "refreshToken";

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: Number(process.env.JWT_REFRESH_EXPIRY_DAYS || 7) * 24 * 60 * 60 * 1000,
  };
}

async function issueTokenPair(res, user, family) {
  const { permissions, roleNames } = await resolvePermissions(user.roles);
  const accessToken = signAccessToken(user, permissions, roleNames);

  const rawRefresh = generateRefreshTokenValue();
  await RefreshToken.create({
    user: user._id,
    tokenHash: hashToken(rawRefresh),
    family,
    expiresAt: refreshExpiryDate(),
  });

  res.cookie(REFRESH_COOKIE, rawRefresh, cookieOptions());
  return { accessToken, permissions, roleNames, rawRefresh };
}

export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user || !user.isActive) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (user.authSource === "local") {
    const valid = await bcrypt.compare(password, user.passwordHash || "");
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  } else {
    // Plug your LDAP bind check in here, e.g.:
    // const valid = await verifyLdapBind(user.ldapDn, password);
    return res.status(501).json({ error: "LDAP auth not yet configured on this route" });
  }

  user.lastLoginAt = new Date();
  await user.save();

  const family = crypto.randomUUID();
  const { accessToken, permissions, roleNames } = await issueTokenPair(res, user, family);

  await AuditLog.create({ action: "LOGIN", actor: user._id, ip: req.ip });

  res.json({
    accessToken,
    user: {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      roles: roleNames,
      permissions,
    },
  });
}

export async function refresh(req, res) {
  const rawToken = req.cookies?.[REFRESH_COOKIE];
  if (!rawToken) return res.status(401).json({ error: "No refresh token" });

  const tokenHash = hashToken(rawToken);
  const stored = await RefreshToken.findOne({ tokenHash });

  if (!stored) return res.status(401).json({ error: "Invalid refresh token" });

  // Reuse detection: this exact token hash was already rotated away once.
  // Someone is replaying an old token -- treat the whole family as compromised.
  if (stored.revoked) {
    await RefreshToken.updateMany(
      { family: stored.family },
      { $set: { revoked: true } }
    );
    await AuditLog.create({
      action: "TOKEN_REUSE_DETECTED",
      actor: stored.user,
      metadata: { family: stored.family },
      ip: req.ip,
    });
    res.clearCookie(REFRESH_COOKIE, { path: "/api/auth" });
    return res.status(401).json({ error: "Session invalidated. Please log in again." });
  }

  if (stored.expiresAt < new Date()) {
    return res.status(401).json({ error: "Refresh token expired" });
  }

  const user = await User.findById(stored.user);
  if (!user || !user.isActive) {
    return res.status(401).json({ error: "Account no longer active" });
  }

  // Rotate: revoke the presented token, issue a fresh one in the same family.
  stored.revoked = true;
  const { accessToken, permissions, roleNames, rawRefresh } = await issueTokenPair(
    res,
    user,
    stored.family
  );
  stored.replacedByHash = hashToken(rawRefresh);
  await stored.save();

  res.json({
    accessToken,
    user: {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      roles: roleNames,
      permissions,
    },
  });
}

export async function logout(req, res) {
  const rawToken = req.cookies?.[REFRESH_COOKIE];
  if (rawToken) {
    await RefreshToken.updateOne(
      { tokenHash: hashToken(rawToken) },
      { $set: { revoked: true } }
    );
  }
  res.clearCookie(REFRESH_COOKIE, { path: "/api/auth" });
  res.json({ message: "Logged out" });
}

export async function me(req, res) {
  const user = await User.findById(req.user.sub).select("-passwordHash");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({
    id: user._id,
    username: user.username,
    name: user.name,
    email: user.email,
    roles: req.user.roles,
    permissions: req.user.permissions,
  });
}
