import express from "express";
import {
  getAdmins,
  toggleAdmin,
  deleteAdmin,
  updateAdmin,
  updateProfile,
  uploadProfileImage
} from "../controllers/userController";

import { createAdmin } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isSuperAdmin } from "../middleware/roleMiddleware";
import { singleUpload } from "../middleware/multer";

const router = express.Router();

// ✅ PROFILE
router.put("/profile/update", authMiddleware, updateProfile);

router.post( "/profile/upload", authMiddleware, singleUpload, uploadProfileImage);

// ✅ ADMIN
router.get("/", authMiddleware, isSuperAdmin, getAdmins);
router.post("/", authMiddleware, isSuperAdmin, createAdmin);
router.put("/:id", authMiddleware, isSuperAdmin, updateAdmin);
router.patch("/:id/toggle", authMiddleware, isSuperAdmin, toggleAdmin);
router.delete("/:id", authMiddleware, isSuperAdmin, deleteAdmin);

export default router;