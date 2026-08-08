import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * We never store the raw refresh token -- only a SHA-256 hash of it.
 * `family` groups every token issued from the same login session so that
 * if a *revoked* token is ever presented again (a strong signal of theft,
 * since it means someone replayed an old token), we can revoke the whole
 * family and force re-login. This is what "JWT rotation" buys you over a
 * single long-lived refresh token.
 */
const refreshTokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tokenHash: { type: String, required: true, unique: true },
    family: { type: String, required: true },
    revoked: { type: Boolean, default: false },
    replacedByHash: { type: String, default: null },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // auto-cleanup

export default mongoose.model("RefreshToken", refreshTokenSchema);
