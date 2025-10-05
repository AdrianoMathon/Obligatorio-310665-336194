import userRepository from "../repositories/user-repository.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createUser = async (req, res) => {
    try {
        const user = req.body;
        const { password, email } = user;
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        console.log('user', user)
        const userSaved = await userRepository.createUser(user);
        const token = jwt.sign({ id: userSaved._id, email: email, perfil: userSaved.perfil }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ usuario: userSaved, token });
    } catch (error) {
        res.status(400).json({ message: "No se pudo crear usuario", error: error.message });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userRepository.getUserByEmail({ email });
        const { password: passwordHash } = user;
        const validatePassword = await bcrypt.compare(password, passwordHash);

        if (validatePassword) {
            const token = jwt.sign({ id: user._id, email: email, perfil: user.perfil }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({token: token});
        } else {
            res.status(401).json({ message: "Error en login, verifique credenciales" });
        }
    } catch (error) {
        res.status(401).json({ message: "Error en login, verifique credenciales" });
    }
}

export const upgradeUserToPremium = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Verificar que el usuario es PLUS
        const user = await userRepository.getUserById(userId);
        if (!user.perfil.includes("PLUS")) {
            return res.status(400).json({ message: "Solo usuarios PLUS pueden cambiar a PREMIUM" });
        }
        
        const updatedUser = await userRepository.updateUser(userId, { perfil: ["PREMIUM"] });
        res.status(200).json({ 
            usuario: updatedUser, 
            message: "Cambio exitoso a PREMIUM. Ahora tienes rutinas ilimitadas!" 
        });
    } catch (error) {
        res.status(400).json({ message: "No se pudo actualizar el perfil" });
    }
}

