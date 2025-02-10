import { Router } from "express";
import { createCourse, updateCourse, deleteCourse, getAllCourses, assignStudentToCourse } from "../controllers/course.controller.js";
import authenticateUser from "../middleware/auth.middleware.js";
import { isTeacher } from "../middleware/role.middleware.js";

const router = Router();

router.post("/", authenticateUser, isTeacher, createCourse);
router.put("/:id", authenticateUser, isTeacher, updateCourse);
router.delete("/:id", authenticateUser, isTeacher, deleteCourse);
router.get("/", getAllCourses);
router.post("/:courseId/students/:studentId", authenticateUser, isTeacher, assignStudentToCourse);

export default router;