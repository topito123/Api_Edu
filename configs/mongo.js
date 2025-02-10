import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar a la base de datos:`, error);
        process.exit(1); // Detiene el servidor si hay error
    }
};

export default connectDB;
