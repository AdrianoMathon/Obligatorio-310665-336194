import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [2, 'Ingrese un nombre válido (mínimo 2 caracteres)'],
    },
    password: { 
        type: String, 
        required: [true, 'Ingrese una contraseña'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    email: {
        type: String,
        required: [true, 'Ingrese un email'],
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Por favor ingresa un email válido'] 
    },
    perfil: {
        type: [String],
        enum: ["PLUS", "PREMIUM"],
        default: ["PLUS"]
    }

}, {
    timestamps: true
})

userSchema.index({ email: 1 }, { unique: true });

export default userSchema;