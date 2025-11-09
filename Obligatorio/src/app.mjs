import express from "express";
import "dotenv/config";
import { connectMongo } from "./config/mongo-config.mjs";
import v1Publicas from "./routes/v1/public.mjs";
import v1Users from "./routes/v1/user.mjs";
import v1Routines from "./routes/v1/routine.mjs";
import v1Images from "./routes/v1/image.mjs";
import logRequest from "./utils/logger.mjs";
import cors from "cors";

const app = express();
const port = process.env.PORT ?? 3000;

console.log('Conexion a mongo DB');
connectMongo();

// Configurar CORS
app.use(cors());

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
    logRequest(req);
    next();
});

// Rutas públicas
app.use("/api/v1", v1Publicas);

// Rutas protegidas
app.use("/api/v1/users", v1Users);
app.use("/api/v1/routines", v1Routines);
app.use("/api/v1/images", v1Images);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.log('err', err);
    if (err.statusCode && err.message) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Error no controlado" });
    }
});

export default app;