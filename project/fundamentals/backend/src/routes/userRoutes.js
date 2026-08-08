import { Router } from "express";
import { listUsers, createUser } from "../controllers/userController.js";
import { requireAuth } from "../middlewares/auth.js";
import { requirePermission } from "../middlewares/rbac.js";
import { handleAvatarUpload } from "../middlewares/upload.js";

const router = Router();

router.use(requireAuth);
router.get("/", requirePermission("users:read"), listUsers);
router.post(
  "/",
  requirePermission("users:create"),
  handleAvatarUpload, // parses multipart body -> populates req.body and req.file
  createUser
);

export default router;
