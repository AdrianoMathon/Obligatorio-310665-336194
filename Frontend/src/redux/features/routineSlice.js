import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const routineSlice = createSlice({
    name: "routines",
    initialState,
    reducers: {
        // Cargar rutinas iniciales
        loadRoutines: (state, action) => {
            return action.payload;
        },

        // Agregar nueva rutina
        addRoutine: (state, action) => {
            state.push(action.payload);
        },

        // Actualizar rutina existente
        updateRoutine: (state, action) => {
            const { _id, ...updates } = action.payload;
            const routine = state.find(r => r._id === _id);
            if (routine) {
                Object.assign(routine, updates);
            }
        },

        // Eliminar rutina
        deleteRoutine: (state, action) => {
            const id = action.payload;
            return state.filter(routine => routine._id !== id);
        }
    }
});

export const { loadRoutines, addRoutine, updateRoutine, deleteRoutine } = routineSlice.actions;
export default routineSlice.reducer;
