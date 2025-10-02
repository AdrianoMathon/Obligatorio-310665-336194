import mongoose from 'mongoose';
import 'dotenv/config';

console.log('🔍 Configuración MongoDB:');
console.log('MONGO_ATLAS_USER:', process.env.MONGO_ATLAS_USER);
console.log('MONGO_ATLAS_PASS:', process.env.MONGO_ATLAS_PASS ? '***' : 'NO CONFIGURADO');
console.log('MONGO_ATLAS_URI:', process.env.MONGO_ATLAS_URI);

async function testMongoConnection() {
    try {
        console.log('\n🚀 Iniciando prueba de conexión a MongoDB Atlas...');
        
        // Construir URI con variables de entorno
        const uri = process.env.MONGO_ATLAS_URI
            .replace('${MONGO_ATLAS_USER}', process.env.MONGO_ATLAS_USER)
            .replace('${MONGO_ATLAS_PASS}', process.env.MONGO_ATLAS_PASS);
        
        console.log('📡 URI final:', uri.replace(process.env.MONGO_ATLAS_PASS, '***'));
        
        // Intentar conexión
        console.log('⏳ Conectando...');
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000, // 10 segundos timeout
        });
        
        console.log('✅ ¡Conexión exitosa a MongoDB Atlas!');
        
        // Hacer ping a la base de datos
        const admin = mongoose.connection.db.admin();
        const result = await admin.ping();
        console.log('🏓 Ping resultado:', result);
        
        // Listar bases de datos disponibles
        const databases = await admin.listDatabases();
        console.log('📋 Bases de datos disponibles:');
        databases.databases.forEach(db => {
            console.log(`  - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
        });
        
        // Probar operación básica
        const testCollection = mongoose.connection.db.collection('connection_test');
        await testCollection.insertOne({ 
            test: true, 
            timestamp: new Date(),
            message: 'Conexión funcionando correctamente' 
        });
        
        const testDoc = await testCollection.findOne({ test: true });
        console.log('📝 Documento de prueba creado:', testDoc);
        
        // Limpiar documento de prueba
        await testCollection.deleteOne({ _id: testDoc._id });
        console.log('🧹 Documento de prueba eliminado');
        
        console.log('\n🎉 ¡Todas las pruebas pasaron! MongoDB Atlas está funcionando correctamente.');
        
    } catch (error) {
        console.error('\n❌ Error en la conexión:');
        console.error('Type:', error.name);
        console.error('Message:', error.message);
        
        if (error.name === 'MongoServerSelectionError') {
            console.error('\n🔧 Posibles soluciones:');
            console.error('1. Verificar que la IP esté en la whitelist de MongoDB Atlas');
            console.error('2. Verificar usuario y contraseña');
            console.error('3. Verificar que el cluster esté activo');
            console.error('4. Verificar la URI de conexión');
        }
        
        if (error.name === 'MongoParseError') {
            console.error('\n🔧 Error en la URI de conexión:');
            console.error('- Verificar formato de la URI');
            console.error('- Verificar caracteres especiales en usuario/contraseña');
        }
    } finally {
        await mongoose.connection.close();
        console.log('\n🔒 Conexión cerrada');
        process.exit(0);
    }
}

// Ejecutar prueba
testMongoConnection();