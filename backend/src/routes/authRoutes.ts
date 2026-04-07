import express from "express";
import {
  login,
  sendOtp,
  verifyOtp,
  resetPasswordWithOtp
} from "../controllers/authController";

const router = express.Router();

router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password-otp", resetPasswordWithOtp);

export default router;