import express from "express";
import { upgradeUserToPremium } from "../controllers/user-controller.mjs";
import { authMiddleware } from "../middleware/auth-middleware.mjs";

const routes = express.Router();

// Middleware autenticación
routes.use(authMiddleware);

// Ruta para mejora de usuario PLUS a PREMIUM
routes.patch("/upgrade-premium", upgradeUserToPremium);

export default routes;