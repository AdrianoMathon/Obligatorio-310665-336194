// Importa Mongoose, la librería para interactuar con MongoDB desde Node.js
import mongoose from "mongoose";

// Importa las variables de entorno definidas en el archivo .env
import "dotenv/config";

// Extrae las variables de entorno necesarias para construir la URL de conexión
const {
    MONGO_HOST, // host donde está corriendo MongoDB (ej. localhost)
    MONGO_PORT, // puerto donde escucha MongoDB (ej. 27017)
    MONGO_DB, // nombre de la base de datos a usar
    MONGO_BD_IN_USE,
    MONGO_USER,
    MONGO_PASS,
    MONGO_ATLAS_USER,
    MONGO_ATLAS_PASS
} = process.env;

let MONGO_URI;
if (MONGO_BD_IN_USE === "atlas") {
    MONGO_URI = `mongodb+srv://${MONGO_ATLAS_USER}:${MONGO_ATLAS_PASS}@obligatoriomathon.fmzz8vj.mongodb.net/?retryWrites=true&w=majority&appName=ObligatorioMathon`;

} else {
    // MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
    MONGO_URI = `mongodb+srv://${MONGO_ATLAS_USER}:${MONGO_ATLAS_PASS}@obligatoriomathon.fmzz8vj.mongodb.net/?retryWrites=true&w=majority&appName=ObligatorioMathon`;

}

// Construye la URI de conexión a MongoDB usando las variables anteriores

// Función asíncrona para conectar a la base de datos MongoDB
export async function connectMongo() {
    try {
        console.log('intentando conexion mongo', MONGO_URI, MONGO_DB, MONGO_BD_IN_USE)
        // Se intenta conectar usando Mongoose con opciones recomendadas
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            dbName: MONGO_DB,
        });

        // Si la conexión es exitosa, imprime mensaje en consola
        console.log("Conectado a MongoDB correctamente");
    } catch (err) {
        // Si hay error al conectar, imprime el error en consola
        console.error("Error al conectar a MongoDB:", err.message);

        // Termina la ejecución de la aplicación ya que no puede continuar sin DB
        process.exit(1);
    }
}
