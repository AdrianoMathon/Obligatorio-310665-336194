import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./features/userSlice"
import routineSlice from "./features/routineSlice"

export const store = configureStore({
    reducer: {
        userSlice,
        routineSlice
    }
})