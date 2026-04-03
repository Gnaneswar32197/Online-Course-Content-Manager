import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("BODY:", req.body);

    const user: any = await User.findOne({ where: { email } });

    console.log("USER:", user?.toJSON());

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const hashedPassword = String(user.password);

    const isMatch = await bcrypt.compare(password, hashedPassword);

    console.log("MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    res.json({ token, user });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};