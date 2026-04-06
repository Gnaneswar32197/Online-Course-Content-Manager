import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";

export const getAdmins = async (req: Request, res: Response) => {
  const admins = await User.findAll({
    where: { role: "admin" },
    attributes: ["id", "name", "email", "isActive"], 
  });

  res.json(admins);
};


export const createAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email,
    password: hashed,
    role: "admin",
  });

  res.status(201).json(admin);
};


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

export const updateAdmin = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email, password } = req.body;

  const admin = await User.findByPk(id);

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

export const deleteAdmin = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await User.destroy({ where: { id } });

  res.json({ message: "Deleted" });
};