import express from 'express';
import { uploadImageBase64, removeImage } from '../../controllers/image-controller.mjs';
import { authMiddleware } from '../../middleware/auth-middleware.mjs';

const router = express.Router();

// Subir imagen (requiere autenticación)
router.post('/', authMiddleware, uploadImageBase64);

// Eliminar imagen (requiere autenticación)
router.delete('/:id', authMiddleware, removeImage);

export default router;