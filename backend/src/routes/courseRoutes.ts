import express from "express";
import {
  createCourse,
  getCourses,
  toggleStatus,
  deleteCourse,
} from "../controllers/courseController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getCourses);
router.post("/", authMiddleware, createCourse);
router.patch("/:id/status", authMiddleware, toggleStatus);
router.delete("/:id", authMiddleware, deleteCourse);

export default router;