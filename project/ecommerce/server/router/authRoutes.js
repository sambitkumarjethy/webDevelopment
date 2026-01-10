import express from "express";
import {
  forgotPassword,
  getUser,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.post("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;
