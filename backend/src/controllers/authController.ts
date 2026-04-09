import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { sendEmail } from "../utils/sendEmail";

// ✅ LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: any = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is deactivated. Contact SuperAdmin.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 🔥 JWT TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name,
        isActive: user.isActive,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // ✅ RETURN FULL USER (INCLUDING PROFILE IMAGE)
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        profileImage: user.profileImage, // 🔥 IMPORTANT FIX
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ SEND OTP
export const sendOtp = async (req: any, res: any) => {
  const { email } = req.body;

  const user: any = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "Email not registered" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await user.save();

  await sendEmail(email, otp, "otp");

  res.json({ message: "OTP sent successfully" });
};

// ✅ VERIFY OTP
export const verifyOtp = async (req: any, res: any) => {
  const { email, otp } = req.body;

  const user: any = await User.findOne({ where: { email } });

  if (!user || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (new Date() > user.otpExpiry) {
    return res.status(400).json({ message: "OTP expired" });
  }

  res.json({ message: "OTP verified" });
};

// ✅ RESET PASSWORD
export const resetPasswordWithOtp = async (req: any, res: any) => {
  const { email, newPassword } = req.body;

  const user: any = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  user.password = hashed;
  user.otp = "";

  await user.save();

  res.json({ message: "Password updated successfully" });
};

// ✅ CREATE ADMIN
export const createAdmin = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ where: { email } });

    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashed,
      role: "admin",
      mustResetPassword: true,
    });

    await sendEmail(email, password, "welcome");

    res.json({ message: "Admin created", admin });

  } catch (err) {
    console.error("CREATE ADMIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};