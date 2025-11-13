import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const loadUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return {
        userId: decoded.id || null,
        name: decoded.name || null,
        email: decoded.email || null,
        perfil: decoded.perfil?.[0] || "PLUS",
        isAuthenticated: true,
        loading: false
      };
    }
  } catch (error) {
    console.error("Error al cargar usuario desde token:", error);
  }
  
  return {
    userId: null,
    name: null,
    email: null,
    perfil: "",
    isAuthenticated: false,
    loading: false
  };
};

const initialState = loadUserFromToken();

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { userId, name, email, perfil } = action.payload;
            state.userId = userId;
            state.name = name;
            state.email = email;
            state.perfil = perfil || state.perfil;
            state.isAuthenticated = true;
        },
        
        updateUser: (state) => {
            const userData = loadUserFromToken();
            return userData;
        },
        
        // Limpiar usuario (logout)
        clearUser: (state) => {
            return {
                userId: null,
                name: null,
                email: null,
                perfil: "",
                isAuthenticated: false,
                loading: false
            };
        }
    }
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
