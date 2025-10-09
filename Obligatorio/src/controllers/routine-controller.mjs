import { createError } from "../error/create-error.mjs";
import routineRepository from "../repositories/routine-repository.mjs";
import userRepository from "../repositories/user-repository.mjs";
import routineSchema from "../model/schemas/routine-schema.mjs";

export const createRoutine = async (req, res) => {
    try {
        const routine = req.body;
        const userId = req.user.id;
        routine.userId = userId;

        // Verificar límites según perfil del usuario
        const user = await userRepository.getUserById(userId);
        const routineCount = await routineRepository.countRoutinesByUserId(userId);

        if (user.perfil.includes("PLUS") && !user.perfil.includes("PREMIUM")) {
            if (routineCount >= 10) {
                return res.status(400).json({ message: "Los usuarios PLUS pueden crear un máximo de 10 rutinas. Cambiate a PREMIUM para rutinas ilimitadas." });
            }
        }

        const rutina = await routineRepository.createRoutine(routine);
        res.status(201).json({ rutina });
    } catch (error) {
        res.status(400).json({ message: "No se pudo crear la rutina" });
    }
}

export const getRoutineById = async (req, res) => {
    try {
        const _id = req.params.id;
        const userId = req.user.id;
        const rutina = await routineRepository.getRoutineById(_id);

        // Verificar si la rutina existe
        if (!rutina) {
            return res.status(404).json({ message: "Rutina no encontrada" });
        }

        // Verificar que la rutina pertenece al usuario
        if (rutina.userId.toString() !== userId) {
            return res.status(403).json({ message: "No tienes acceso a esta rutina" });
        }

        res.status(200).json({ rutina });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getRoutinesByUser = async (req, res) => {
    try {
        console.log('req.user', req.user);
        const { id: userId } = req.user;
        const userRoutines = await routineRepository.getRoutineByUserId(userId);
        res.status(200).json({ rutinas: userRoutines });
    } catch (error) {
        res.status(400).json({ message: "No se pudieron obtener las rutinas" });
    }
}

export const updateRoutine = async (req, res) => {
    try {
        const _id = req.params.id;
        const userId = req.user.id;
        const updateData = req.body;

        // Verificar que la rutina pertenece al usuario antes de actualizar
        const existingRoutine = await routineRepository.getRoutineById(_id);
        if (existingRoutine.userId.toString() !== userId) {
            return res.status(403).json({ message: "No tienes acceso a esta rutina" });
        }

        const rutina = await routineRepository.updateRoutine(_id, updateData);
        res.status(200).json({ rutina, message: "Rutina actualizada correctamente" });
    } catch (error) {
        res.status(400).json({ message: "No se pudo actualizar la rutina" });
    }
}

export const deleteRoutine = async (req, res) => {
    try {
        const _id = req.params.id;
        const userId = req.user.id;
        // Verificar que la rutina pertenece al usuario antes de eliminar
        const existingRoutine = await routineRepository.getRoutineById(_id);
        if (existingRoutine.userId.toString() !== userId) {
            return res.status(403).json({ message: "No tienes acceso a esta rutina" });
        }

        await routineRepository.deleteRoutine(_id);
        res.status(200).json({ message: "Rutina eliminada correctamente" });
    } catch (error) {
        res.status(400).json({ message: "No se pudo eliminar la rutina" });
    }
}

export const countRoutinesByUser = async (req, res) => {
    try {
        console.log('req.params:', req.params);
        console.log('req.user:', req.user);
        
        // Usar userId del parámetro si existe, sino usar el del token
        const userId = req.params.userId || req.user.id;
        
        // Si se especifica un userId en la URL, validar que coincida con el usuario autenticado
        if (req.params.userId && req.params.userId !== req.user.id) {
            return res.status(403).json({ message: "Solo puedes consultar el conteo de tus propias rutinas" });
        }
        
        const count = await routineRepository.countRoutinesByUserId(userId);
        res.status(200).json({ 
            userId: userId,
            routineCount: count,
            message: `Cantidad de rutinas: ${count}` 
        });
    } catch (error) {
        console.error('Error en countRoutinesByUser:', error);
        res.status(500).json({ 
            message: "No se pudo obtener el conteo de rutinas", 
            error: error.message 
        });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = routineSchema.path('category').enumValues;
        res.status(200).json({ categorias: categories });
    } catch (error) {
        res.status(400).json({ message: "No se pudieron obtener las categorías" });
    }
}
