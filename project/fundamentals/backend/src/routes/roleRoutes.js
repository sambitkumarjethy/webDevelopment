import { Router } from "express";
import Role from "../models/Role.js";
import { requireAuth } from "../middlewares/auth.js";
import { requirePermission } from "../middlewares/rbac.js";

const router = Router();

router.use(requireAuth);

router.get("/", requirePermission("roles:read"), async (req, res) => {
  const roles = await Role.find().select("name description parentRole permissions");
  res.json(roles);
});

export default router;
