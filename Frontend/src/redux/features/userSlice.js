// src/redux/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    name: null,
    email: null,
    isAuthenticated: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { userId, name, email } = action.payload;
            state.userId = userId;
            state.name = name;
            state.email = email;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.userId = null;
            state.name = null;
            state.email = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
