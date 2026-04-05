import { Request, Response } from "express";
import { Course } from "../models/Course";

export const createCourse = async (req: any, res: Response) => {
  try {
    const course = await Course.create({
      ...req.body,
      createdBy: req.user.name,
    });

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
};

export const getCourses = async (req: any, res: Response) => {
  try {
    const user = req.user; // from JWT

    let courses;

    if (user.role === "superadmin") {
      // 👑 SuperAdmin → all courses
      courses = await Course.findAll();
    } else {
      // 👨‍💼 Admin → only their courses
      courses = await Course.findAll({
        where: { createdBy: user.name }, // 🔥 IMPORTANT
      });
    }

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

export const toggleStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id); // ✅ FIX

  const course: any = await Course.findByPk(id);

  if (!course) return res.status(404).json({ message: "Not found" });

  course.status =
    course.status === "Published" ? "Draft" : "Published";

  await course.save();

  res.json(course);
};

export const deleteCourse = async (req: Request, res: Response) => {
  const id = Number(req.params.id); // ✅ FIX

  await Course.destroy({ where: { id } });

  res.json({ message: "Deleted" });
};

// controllers/courseController.ts

export const getPublishedCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.findAll({
      where: { status: "published" }, // 🔥 IMPORTANT
    });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};