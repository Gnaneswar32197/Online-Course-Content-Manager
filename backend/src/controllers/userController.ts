import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import cloudinary from "../utils/cloudinary";

// ✅ GET ADMINS
export const getAdmins = async (req: Request, res: Response) => {
  const admins = await User.findAll({
    where: { role: "admin" },
    attributes: ["id", "name", "email", "isActive"],
  });

  res.json(admins);
};

// ✅ TOGGLE ADMIN
export const toggleAdmin = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const admin: any = await User.findByPk(id);

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  admin.isActive = !admin.isActive;
  await admin.save();

  res.json(admin);
};

// ✅ UPDATE ADMIN
export const updateAdmin = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email, password } = req.body;

  const admin: any = await User.findByPk(id);

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  if (name) admin.name = name;
  if (email) admin.email = email;

  if (password) {
    admin.password = await bcrypt.hash(password, 10);
  }

  await admin.save();

  res.json(admin);
};

// ✅ DELETE ADMIN
export const deleteAdmin = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await User.destroy({ where: { id } });

  res.json({ message: "Deleted" });
};

// ✅ UPDATE PROFILE
export const updateProfile = async (req: any, res: Response) => {
  try {
    const { name, email } = req.body;

    const user: any = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ✅ 🔥 UPLOAD PROFILE IMAGE (CLOUDINARY)
export const uploadProfileImage = async (req: any, res: any) => {
  try {
    const user: any = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_images" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });


    user.profileImage = uploadResult.secure_url;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};