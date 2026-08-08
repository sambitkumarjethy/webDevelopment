import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * Role hierarchy model.
 * A role can declare a `parentRole`. When resolving a user's effective
 * permissions, we walk UP the parentRole chain and union every permission
 * found along the way. This means a senior role (e.g. "Admin") should be
 * the parent of a junior role (e.g. "Editor") if Admin is meant to include
 * everything Editor can do, plus more of its own.
 *
 * Example hierarchy:
 *   SuperAdmin -> Admin -> Editor -> Viewer
 * Viewer has no parent (base of the chain).
 * Editor's parentRole = Viewer, so Editor effectively has Editor + Viewer perms.
 * Admin's parentRole = Editor, so Admin has Admin + Editor + Viewer perms.
 */
const roleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    // Stable, human-readable id ("admin", "editor", "viewer") that the
    // frontend's role picker sends instead of a Mongo ObjectId -- avoids
    // the client needing to know or fetch _ids just to submit a form.
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: { type: String, default: "" },
    parentRole: { type: Schema.Types.ObjectId, ref: "Role", default: null },
    permissions: [{ type: String }], // e.g. "users:create", "users:read", "roles:manage"
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      default: null, // null = applies to the IAM portal itself; set once you add other apps
    },
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);
