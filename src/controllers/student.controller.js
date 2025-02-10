import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";
import Course from "../models/course.model.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    const foundStudent = await Student.findOne({ email: email.toLowerCase() });
    if (!foundStudent) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, foundStudent.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: foundStudent._id, role: foundStudent.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      return res.status(400).json({ message: "El estudiante ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({ 
      name, 
      email: email.toLowerCase(), 
      password: hashedPassword 
    });

    await newStudent.save();

    res.status(201).json({ message: "Estudiante registrado exitosamente", student: newStudent });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const foundStudent = await Student.findById(studentId);
    if (!foundStudent) return res.status(404).json({ message: "Student not found" });

    if (foundStudent.courses.includes(courseId)) {
      return res.status(400).json({ message: "Student already enrolled in course" });
    }

    if (foundStudent.courses.length >= 3) {
      return res.status(400).json({ message: "Student already enrolled in 3 courses" });
    }

    foundStudent.courses.push(courseId);
    await foundStudent.save();

    res.status(200).json({ message: "Student enrolled in course successfully", student: foundStudent });
  } catch (error) {
    res.status(500).json({ message: "Error on the server", error });
  }
};

export const getStudentCourses = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate({
      path: 'courses',
      populate: { path: 'teacher', select: 'name' }
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student.courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { name, email } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (name) student.name = name;
    if (email) student.email = email;

    await student.save();

    res.status(200).json({ message: "Student profile updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};