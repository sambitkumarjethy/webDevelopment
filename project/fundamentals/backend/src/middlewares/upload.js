import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AVATAR_DIR = path.join(__dirname, "..", "..", "uploads", "avatars");
fs.mkdirSync(AVATAR_DIR, { recursive: true });

const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2MB, matches the frontend's own cap

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, AVATAR_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const unique = crypto.randomBytes(16).toString("hex");
    cb(null, `${unique}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed for avatars"));
  }
  cb(null, true);
}

export const avatarUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_AVATAR_BYTES },
});

// Wraps multer's callback-style error (e.g. file too large, bad mimetype)
// into the same JSON error shape the rest of the API uses.
export function handleAvatarUpload(req, res, next) {
  avatarUpload.single("avatar")(req, res, (err) => {
    if (!err) return next();
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "Avatar image must be under 2MB" });
    }
    return res.status(400).json({ error: err.message || "Invalid avatar upload" });
  });
}
