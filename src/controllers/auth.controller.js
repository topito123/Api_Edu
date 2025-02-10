import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/student.model.js"; // Importamos el modelo correcto
import Teacher from "../models/teacher.model.js";

dotenv.config();

export const registerTeacher = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar si ya existe
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: "El profesor ya está registrado" });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo profesor
        const newTeacher = new Teacher({
            name,
            email,
            password: hashedPassword,
            role: "TEACHER_ROLE"  // Se asegura de asignar correctamente el rol
        });

        await newTeacher.save();

        res.status(201).json({ message: "Profesor registrado exitosamente", teacher: newTeacher });
    } catch (error) {
        console.error("Error en el registro de profesor:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const registerStudent = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validar que todos los campos estén presentes
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Normalizar email a minúsculas
        const normalizedEmail = email.toLowerCase();

        // Verificar si el estudiante ya existe
        const existingStudent = await Student.findOne({ email: normalizedEmail });
        if (existingStudent) {
            return res.status(400).json({ message: "El estudiante ya está registrado" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear estudiante
        const newStudent = new Student({ 
            name, 
            email: normalizedEmail, 
            password: hashedPassword, 
            role 
        });
        await newStudent.save();

        res.status(201).json({ message: "Estudiante registrado exitosamente", student: newStudent });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
