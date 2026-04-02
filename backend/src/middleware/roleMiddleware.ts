import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

export const isSuperAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};