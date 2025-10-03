import mongoose from "mongoose";

const routineSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre de la rutina es obligatorio'],
        trim: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    exercises: [{
        name: String,
        sets: Number,
        reps: Number,
        weight: Number,
        category: String
    }],
    category: {
        type: String,
        enum: [
            "FUERZA",   
            "CARDIO",         
            "FLEXIBILIDAD",   
            "FUNCIONAL",  
            "HIIT"          
        ],
        required: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User" 
    }
}, {
    timestamps: true
});

export default routineSchema;