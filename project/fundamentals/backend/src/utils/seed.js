import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

async function seed() {
  await connectDB();

  // Base of the hierarchy: Viewer has no parent.
  const viewer = await Role.findOneAndUpdate(
    { slug: "viewer" },
    {
      name: "Viewer",
      slug: "viewer",
      description: "Read-only access across masters",
      permissions: ["users:read", "roles:read"],
      parentRole: null,
    },
    { upsert: true, new: true }
  );

  // Editor inherits everything Viewer has, plus its own write permissions.
  const editor = await Role.findOneAndUpdate(
    { slug: "editor" },
    {
      name: "Editor",
      slug: "editor",
      description: "Can create and edit users",
      permissions: ["users:create", "users:update"],
      parentRole: viewer._id,
    },
    { upsert: true, new: true }
  );

  // Admin inherits Editor (which inherits Viewer), plus role management.
  // slug matches the "admin" id hardcoded in the frontend's AVAILABLE_ROLES.
  const admin = await Role.findOneAndUpdate(
    { slug: "admin" },
    {
      name: "Admin",
      slug: "admin",
      description: "Full application administration",
      permissions: ["roles:manage", "users:delete"],
      parentRole: editor._id,
    },
    { upsert: true, new: true }
  );

  // SuperAdmin sits above everything with a wildcard permission.
  // Not exposed in the Add User role picker -- assign manually if needed.
  const superAdmin = await Role.findOneAndUpdate(
    { slug: "superadmin" },
    {
      name: "SuperAdmin",
      slug: "superadmin",
      description: "Unrestricted access",
      permissions: ["*"],
      parentRole: admin._id,
    },
    { upsert: true, new: true }
  );

  const existingUser = await User.findOne({ username: "superadmin" });
  if (!existingUser) {
    const passwordHash = await bcrypt.hash("ChangeMe123!", 12);
    await User.create({
      employeeId: "EMP-0001",
      username: "superadmin",
      name: "Super Admin",
      email: "superadmin@example.com",
      authSource: "local",
      passwordHash,
      roles: [superAdmin._id],
    });
    console.log("[seed] created superadmin / ChangeMe123! -- change this immediately");
  } else {
    console.log("[seed] superadmin user already exists, skipping");
  }

  console.log("[seed] role hierarchy: Viewer -> Editor -> Admin -> SuperAdmin");
  process.exit(0);
}

seed().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
