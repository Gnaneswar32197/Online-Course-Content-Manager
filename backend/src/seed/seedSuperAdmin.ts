import bcrypt from "bcrypt";
import { User } from "../models/User";

export const seedSuperAdmin = async () => {
  const existing = await User.findOne({ where: { role: "superadmin" } });

  if (!existing) {
    const hashed = await bcrypt.hash("123456", 10);

    await User.create({
      name: "abhishek",
      email: "abhishek@gmail.com",
      password: hashed,
      role: "superadmin",
    });

    console.log(" SuperAdmin Created");
  }
};