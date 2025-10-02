import express from 'express';
import cors from 'cors';
import publicRoutes from './routes/public.mjs';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba básica
app.get('/', (req, res) => {
  res.json({
    message: '¡Servidor funcionando correctamente!',
    timestamp: new Date().toISOString(),
    status: 'OK',
    endpoints: {
      health: '/api/health',
      login: '/login',
      signup: '/signup'
    }
  });
});

// Ruta de prueba para verificar la API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: process.env.DB_TYPE || 'not configured'
  });
});

// Ruta para probar parámetros
app.get('/api/hello/:name', (req, res) => {
  const { name } = req.params;
  res.json({
    message: `¡Hola ${name}!`,
    timestamp: new Date().toISOString()
  });
});

// Rutas de autenticación
app.use('/', publicRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

export default app;