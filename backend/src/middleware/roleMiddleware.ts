import { Request, Response, NextFunction } from "express";

export const isSuperAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user?.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};