import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";


const Rutas = () => {
  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Rutas;
