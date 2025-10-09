import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Simular __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logRequest = (req) => {
    const now = new Date();
    const [date] = now.toISOString().split("T");
    const logDir = path.join(__dirname, "logger");
    const logFile = path.join(logDir, `${date}.log`);

    const logMessage = `[${now.toISOString()}] METHOD: ${req.method} ${req.url}\n`;

    // Asegura que el directorio de logs exista
    fs.mkdir(logDir, { recursive: true }, (err) => {
        if (err) return console.error("Error creating log directory:", err);

        // Escribe (o agrega) al archivo de log
        fs.appendFile(logFile, logMessage, (err) => {
            if (err) console.error("Error writing log:", err);
        });
    });
};

export default logRequest;
