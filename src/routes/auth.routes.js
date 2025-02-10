import { Router } from "express";
import { loginStudent } from "../controllers/student.controller.js";
import { loginTeacher } from "../controllers/teacher.controller.js";
import { registerStudent } from "../controllers/auth.controller.js";
import { registerTeacher } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register/student", registerStudent); // 👈 Ruta correcta para estudiantes
router.post("/register/teacher", registerTeacher); // 👈 Ruta correcta para profesores
router.post("/student/login", loginStudent);  // Login de estudiantes
router.post("/teacher/login", loginTeacher);  // Login de profesores


export default router;