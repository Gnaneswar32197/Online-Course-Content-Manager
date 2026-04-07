import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { sendEmail } from "../utils/sendEmail";


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

    
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req: any, res: any) => {
  const { userId, newPassword } = req.body;

  const user = await User.findByPk(userId);

  const hashed = await bcrypt.hash(newPassword, 10);

  user!.password = hashed;
  user!.mustResetPassword = false;

  await user!.save();

  res.json({ message: "Password updated" });
};

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

    // 🔥 ENABLE THIS
    await sendEmail(email, password);

    res.json({ message: "Admin created", admin });

  } catch (err) {
    console.error("CREATE ADMIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};