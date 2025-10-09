import { createError } from "../error/create-error.mjs";
import routineRepository from "../repositories/routine-repository.mjs";
import userRepository from "../repositories/user-repository.mjs";
import routineSchema from "../model/schemas/routine-schema.mjs";

export const createRoutine = async (req, res, next) => {
    try {
        const routine = req.body;
        const userId = req.user.id;
        routine.userId = userId;

        // Verificar límites según perfil del usuario
        const user = await userRepository.getUserById(userId);
        const routineCount = await routineRepository.countRoutinesByUserId(userId);

        if (user.perfil.includes("PLUS") && !user.perfil.includes("PREMIUM")) {
            if (routineCount >= 10) {
                throw createError("Los usuarios PLUS pueden crear un máximo de 10 rutinas. Cambiate a PREMIUM para rutinas ilimitadas.", 403);
            }
        }

        const rutina = await routineRepository.createRoutine(routine);
        res.status(201).json({ rutina });
    } catch (error) {
        if (error.statusCode) {
            next(error);
        } else {
            next(createError("No se pudo crear la rutina", 400));
        }
    }
}

export const getRoutineById = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const userId = req.user.id;
        const rutina = await routineRepository.getRoutineById(_id);

        // Verificar si la rutina existe
        if (!rutina) {
            throw createError("Rutina no encontrada", 404);
        }

        // Verificar que la rutina pertenece al usuario
        if (rutina.userId.toString() !== userId) {
            throw createError("No tienes acceso a esta rutina", 403);
        }

        res.status(200).json({ rutina });
    } catch (error) {
        if (error.statusCode) {
            next(error);
        } else {
            next(createError("Error interno del servidor", 500));
        }
    }
}

export const getRoutinesByUser = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const userRoutines = await routineRepository.getRoutineByUserId(userId);
        res.status(200).json({ rutinas: userRoutines });
    } catch (error) {
        next(createError("No se pudieron obtener las rutinas", 400));
    }
}

export const updateRoutine = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const userId = req.user.id;
        const updateData = req.body;

        // Verificar que la rutina pertenece al usuario antes de actualizar
        const existingRoutine = await routineRepository.getRoutineById(_id);
        if (!existingRoutine) {
            throw createError("Rutina no encontrada", 404);
        }
        if (existingRoutine.userId.toString() !== userId) {
            throw createError("No tienes acceso a esta rutina", 403);
        }

        const rutina = await routineRepository.updateRoutine(_id, updateData);
        res.status(200).json({ rutina, message: "Rutina actualizada correctamente" });
    } catch (error) {
        if (error.statusCode) {
            next(error);
        } else {
            next(createError("No se pudo actualizar la rutina", 400));
        }
    }
}

export const deleteRoutine = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const userId = req.user.id;
        // Verificar que la rutina pertenece al usuario antes de eliminar
        const existingRoutine = await routineRepository.getRoutineById(_id);
        if (!existingRoutine) {
            throw createError("Rutina no encontrada", 404);
        }
        if (existingRoutine.userId.toString() !== userId) {
            throw createError("No tienes acceso a esta rutina", 403);
        }

        await routineRepository.deleteRoutine(_id);
        res.status(200).json({ message: "Rutina eliminada correctamente" });
    } catch (error) {
        if (error.statusCode) {
            next(error);
        } else {
            next(createError("No se pudo eliminar la rutina", 400));
        }
    }
}

export const countRoutinesByUser = async (req, res, next) => {
    try {
        // Usar userId del parámetro si existe, sino usar el del token
        const userId = req.params.userId || req.user.id;
        
        // Si se especifica un userId en la URL, validar que coincida con el usuario autenticado
        if (req.params.userId && req.params.userId !== req.user.id) {
            throw createError("Solo puedes consultar el conteo de tus propias rutinas", 403);
        }
        
        const count = await routineRepository.countRoutinesByUserId(userId);
        res.status(200).json({ 
            userId: userId,
            routineCount: count,
            message: `Cantidad de rutinas: ${count}` 
        });
    } catch (error) {
        console.error('Error en countRoutinesByUser:', error);
        if (error.statusCode) {
            next(error);
        } else {
            next(createError("No se pudo obtener el conteo de rutinas", 500));
        }
    }
}

export const getCategories = async (req, res, next) => {
    try {
        const categories = routineSchema.path('category').enumValues;
        res.status(200).json({ categorias: categories });
    } catch (error) {
        next(createError("No se pudieron obtener las categorías", 400));
    }
}
