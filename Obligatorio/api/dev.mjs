import "dotenv/config";
import app from "../src/app.mjs";
import { connectMongo } from "../src/config/mongo-config.mjs";
import { baseConstant } from "../src/constant/base-constant.mjs";

const port = process.env.PORT ?? 3000;

// Conectar a MongoDB si DB_TYPE es mongo
if (process.env.DB_TYPE === baseConstant.MONGO) {
    console.log('🔄 Conectando a MongoDB...');
    await connectMongo();
}

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    console.log(`📊 Base de datos: ${process.env.DB_TYPE || 'no configurada'}`);
    if (process.env.DB_TYPE === baseConstant.MONGO) {
        console.log(`🍃 MongoDB Atlas conectado - DB: ${process.env.MONGO_DB}`);
    }
});