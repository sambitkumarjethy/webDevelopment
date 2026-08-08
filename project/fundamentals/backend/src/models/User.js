import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // Optional now -- kept for organizations that do track it, but the
    // current Add User form no longer collects it. `sparse` lets many
    // users have no employeeId without violating the unique index.
    employeeId: { type: String, unique: true, sparse: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },

    authSource: { type: String, enum: ["local", "ldap"], default: "local" },
    passwordHash: { type: String }, // required if authSource === "local"
    ldapDn: { type: String }, // required if authSource === "ldap"

    // Public path to the uploaded profile picture, e.g. "/uploads/avatars/xyz.jpg"
    avatarUrl: { type: String, default: null },

    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],

    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
