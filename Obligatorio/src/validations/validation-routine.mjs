import Joi from "joi";
import routineSchema from "../model/schemas/routine-schema.mjs";

// Obtener categorías dinámicamente del schema
const validCategories = routineSchema.path('category').enumValues;

export const validateCreateRoutine = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(200).optional().allow('', null),
    imgUrl: Joi.string().uri().optional().allow('', null),
    category: Joi.string().valid(...validCategories).required(),
    exercises: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            sets: Joi.number().min(1).optional(),
            reps: Joi.number().min(1).optional(),
            weight: Joi.number().min(0).optional(),
            muscle: Joi.string().optional()
        })
    ).optional()
});

export const validateGetRoutineById = Joi.object({
    id: Joi.string().required()
});

export const validateUpdateRoutine = validateCreateRoutine; // Mismas validaciones