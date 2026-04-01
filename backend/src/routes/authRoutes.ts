import express from "express";
import { login, createAdmin } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isSuperAdmin } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/login", login);

// Only SuperAdmin can create admin
router.post("/create-admin", authMiddleware, isSuperAdmin, createAdmin);

export default router;