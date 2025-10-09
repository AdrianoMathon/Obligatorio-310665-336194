import userRepository from "../repositories/user-repository.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createError } from "../error/create-error.mjs";

export const createUser = async (req, res, next) => {
    try {
        const user = req.body;
        const { password, email } = user;
        
        // Verificar si el usuario ya existe antes de crear
        const existingUser = await userRepository.getUserByEmail({ email });
        if (existingUser) {
            throw createError("Usuario ya existe", 409);
        }
        
        // Hashear la contraseña DESPUÉS de que JOI la haya validado
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        
        const userSaved = await userRepository.createUser(user);
        const token = jwt.sign({ id: userSaved._id, email: email, perfil: userSaved.perfil }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ usuario: userSaved, token });
    } catch (error) {
        if (error.statusCode) {
            next(error);
        } else {      
            next(createError("No se pudo crear usuario", 400));
        }
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userRepository.getUserByEmail({ email });
        
        if (!user) {
            throw createError("Error en login, verifique credenciales", 401);
        }
        
        const { password: passwordHash } = user;
        const validatePassword = await bcrypt.compare(password, passwordHash);

        if (validatePassword) {
            const token = jwt.sign({ id: user._id, email: email, perfil: user.perfil }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ token: token });
        } else {
            throw createError("Error en login, verifique credenciales", 401);
        }
    } catch (error) {
        if (error.statusCode) {
            next(error);
        } else {
            next(createError("Error en login, verifique credenciales", 401));
        }
    }
}

export const upgradeUserToPremium = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        // Verificar que el usuario es PLUS
        const user = await userRepository.getUserById(userId);
        if (!user.perfil.includes("PLUS")) {
            throw createError("Solo usuarios PLUS pueden cambiar a PREMIUM", 400);
        }
        
        const updatedUser = await userRepository.updateUser(userId, { perfil: ["PREMIUM"] });
        res.status(200).json({ 
            usuario: updatedUser, 
            message: "Cambio exitoso a PREMIUM. Ahora tienes rutinas ilimitadas!" 
        });
    } catch (error) {
        if (error.statusCode) {
            next(error);
        } else {
            next(createError("No se pudo actualizar el perfil", 400));
        }
    }
}

