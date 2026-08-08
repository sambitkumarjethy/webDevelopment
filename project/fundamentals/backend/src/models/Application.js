import mongoose from "mongoose";

/**
 * Registered downstream applications (SIP calculator, rent tracker, etc).
 * Kept minimal for now -- this is what future multi-app SSO hangs off of.
 */
const applicationSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // "iam-portal", "sip-calculator"
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
