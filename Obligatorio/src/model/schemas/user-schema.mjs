import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true, // convierte a minúsculas
        match: [/.+@.+\..+/, 'Por favor ingresa un email válido'] // regex simple para validar email
    },
    edad: { type: Number },
    perfil: {
        type: [String],
        enum: ["ADMIN", "USER"],
        default: ["USER"]
    }

}, {
    timestamps: true
})

//indice email unico y ascendente
userSchema.index({ email: 1 }, { unique: true });

export default userSchema;