import express from "express";
import {
  getAdmins,
  toggleAdmin,
  deleteAdmin,
  updateAdmin
} from "../controllers/userController";

import { createAdmin } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isSuperAdmin } from "../middleware/roleMiddleware";

const router = express.Router();

router.get("/", authMiddleware, isSuperAdmin, getAdmins);
router.post("/", authMiddleware, isSuperAdmin, createAdmin);
router.put("/:id", authMiddleware, isSuperAdmin, updateAdmin);
router.patch("/:id/toggle", authMiddleware, isSuperAdmin, toggleAdmin);
router.delete("/:id", authMiddleware, isSuperAdmin, deleteAdmin);

export default router;