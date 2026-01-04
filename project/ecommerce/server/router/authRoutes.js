import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", getUser);

export default router;
