import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
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

export default router;
