import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, // "USER_CREATED", "LOGIN", "TOKEN_REUSE_DETECTED", ...
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    target: { type: mongoose.Schema.Types.ObjectId, default: null },
    metadata: { type: Object, default: {} },
    ip: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
