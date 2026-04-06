import express from "express";
import {
  createCourse,
  getCourses,
  toggleStatus,
  deleteCourse,
  getPublishedCourses,
  updateCourse,
} from "../controllers/courseController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getCourses);
router.post("/", authMiddleware, createCourse);
router.patch("/:id/status", authMiddleware, toggleStatus);
router.put("/:id", authMiddleware, updateCourse);
router.delete("/:id", authMiddleware, deleteCourse);
router.get("/published", getPublishedCourses);

export default router;