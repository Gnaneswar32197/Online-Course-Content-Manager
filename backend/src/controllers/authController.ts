import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 🔍 Find user
    const user: any = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // ❌ BLOCK INACTIVE USER
    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is deactivated. Contact SuperAdmin.",
      });
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 🔥 Generate token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name,
        isActive: user.isActive, // ✅ include this
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // 📤 Response
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