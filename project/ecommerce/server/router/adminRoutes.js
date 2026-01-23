import express from "express";
import {
  getAllUsers,
  deleteUser,
  dashboardStats,
} from "../controllers/adminController.js";
import {
  authorizedRoles,
  isAuthenticated,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get(
  "/getallUsers",
  isAuthenticated,
  authorizedRoles("Admin"),
  getAllUsers,
); // TO BE SHOWN IN DASHBOARD

router.delete(
  "/delte/:id",
  isAuthenticated,
  authorizedRoles("Admin"),
  deleteUser,
);
router.get(
  "/fetch/dashboard-stats",
  isAuthenticated,
  authorizedRoles("Admin"),
  dashboardStats,
);

export default router;
