import fs from "fs";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";
import AuditLog from "../models/AuditLog.js";

export async function listUsers(req, res) {
  const {
    page = 1,
    pageSize = 10,
    search = "",
    sortField = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const filter = search
    ? {
        $or: [
          { username: new RegExp(search, "i") },
          { name: new RegExp(search, "i") },
          { email: new RegExp(search, "i") },
          { employeeId: new RegExp(search, "i") },
        ],
      }
    : {};

  const [users, totalRows] = await Promise.all([
    User.find(filter)
      .select("-passwordHash")
      .populate("roles", "name")
      .sort({ [sortField]: sortOrder === "desc" ? -1 : 1 })
      .skip((Number(page) - 1) * Number(pageSize))
      .limit(Number(pageSize)),
    User.countDocuments(filter),
  ]);

  res.json({ users, totalRows });
}

export async function createUser(req, res) {
  // multipart/form-data via multer: text fields land in req.body as strings,
  // repeated "roleIds[]" fields collapse into an array automatically.
  const {
    username,
    name,
    email,
    authSource = "local",
    password,
    ldapDn,
  } = req.body;

  const roleSlugs = [].concat(req.body["roleIds[]"] ?? req.body.roleIds ?? []);

  // If validation fails after the file was already written to disk,
  // clean it up so we don't accumulate orphaned uploads.
  const cleanupUploadedFile = () => {
    if (req.file) fs.unlink(req.file.path, () => {});
  };

  if (!username || !name || !email) {
    cleanupUploadedFile();
    return res.status(400).json({ error: "Username, name, and email are required" });
  }

  const existing = await User.findOne({ $or: [{ username }, { email }] });
  if (existing) {
    cleanupUploadedFile();
    return res.status(409).json({ error: "User with this username or email already exists" });
  }

  const roles = await Role.find({ slug: { $in: roleSlugs } });
  if (roles.length !== roleSlugs.length) {
    cleanupUploadedFile();
    return res.status(400).json({ error: "One or more roles are invalid" });
  }

  const userDoc = {
    username: username.toLowerCase(),
    name,
    email: email.toLowerCase(),
    authSource,
    roles: roles.map((r) => r._id),
  };

  if (req.file) {
    userDoc.avatarUrl = `/uploads/avatars/${req.file.filename}`;
  }

  if (authSource === "local") {
    if (!password || password.length < 8) {
      cleanupUploadedFile();
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    userDoc.passwordHash = await bcrypt.hash(password, 12);
  } else {
    if (!ldapDn) {
      cleanupUploadedFile();
      return res.status(400).json({ error: "ldapDn is required for LDAP users" });
    }
    userDoc.ldapDn = ldapDn;
  }

  let user;
  try {
    user = await User.create(userDoc);
  } catch (err) {
    cleanupUploadedFile();
    throw err;
  }

  await AuditLog.create({
    action: "USER_CREATED",
    actor: req.user?.sub || null,
    target: user._id,
    ip: req.ip,
  });

  const { passwordHash, ...safeUser } = user.toObject();
  res.status(201).json(safeUser);
}
