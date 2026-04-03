import express from "express";
import {
  getAdmins,
  createAdmin,
  toggleAdmin,
  deleteAdmin,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isSuperAdmin } from "../middleware/roleMiddleware";

const router = express.Router();

router.get("/", authMiddleware, isSuperAdmin, getAdmins);
router.post("/", authMiddleware, isSuperAdmin, createAdmin);
router.patch("/:id/toggle", authMiddleware, isSuperAdmin, toggleAdmin);
router.delete("/:id", authMiddleware, isSuperAdmin, deleteAdmin);

export default router;