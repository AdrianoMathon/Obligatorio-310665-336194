import express from "express";
import { countRoutinesByUser, createRoutine, deleteRoutine, getRoutineById, getRoutinesByUser, updateRoutine, getCategories } from "../../controllers/routine-controller.mjs";
import { validateCreateRoutine, validateGetRoutineById, validateUpdateRoutine } from "../../validations/validation-routine.mjs";
import { validateRequest } from "../../middleware/validation.middleware.mjs";
import reqValidate from "../../constant/request-validate-constants.mjs";
import { authMiddleware } from "../../middleware/auth-middleware.mjs";

const routes = express.Router();

// Middleware autenticación
routes.use(authMiddleware);

// Rutas públicas para usuarios autenticados
routes.get("/categories", getCategories);
routes.get("/count/:userId", countRoutinesByUser); // Sin validación de perfil
routes.post("/", validateRequest(validateCreateRoutine, reqValidate.BODY), createRoutine);
routes.get("/", getRoutinesByUser);
routes.get("/:id", validateRequest(validateGetRoutineById, reqValidate.PARAM), getRoutineById);
routes.put("/:id", validateRequest(validateUpdateRoutine, reqValidate.BODY), updateRoutine);
routes.delete("/:id", deleteRoutine);

export default routes;