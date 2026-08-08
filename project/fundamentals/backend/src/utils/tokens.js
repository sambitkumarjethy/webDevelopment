import jwt from "jsonwebtoken";
import crypto from "crypto";

export function signAccessToken(user, permissions, roleNames) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      username: user.username,
      roles: roleNames,
      permissions,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

// Refresh tokens are opaque random strings (not JWTs) -- we only ever
// store their hash, so a stolen DB dump doesn't leak usable tokens.
export function generateRefreshTokenValue() {
  return crypto.randomBytes(48).toString("hex");
}

export function hashToken(rawToken) {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

export function refreshExpiryDate() {
  const days = Number(process.env.JWT_REFRESH_EXPIRY_DAYS || 7);
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}
