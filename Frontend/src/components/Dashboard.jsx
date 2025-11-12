import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import Menu from "./Menu";
import Contenido from "./Contenido";
import InformeUso from "./InformeUso";
import CambioPlan from "./CambioPlan";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Verificar si hay un token en localStorage al cargar el componente
    const token = localStorage.getItem("token");
    
    if (!token) {
      // Si no hay token, redirigir al login
      navigate("/login");
      return;
    }

    try {
      // Decodificar el token para obtener información del usuario
      const decoded = jwtDecode(token);
      
      // Verificar si el token ha expirado
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token expirado, limpiar y redirigir al login
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
        return;
      }

      setUserData(decoded);
    } catch (error) {
      console.error("Error al decodificar token:", error);
      // Token inválido, limpiar y redirigir al login
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Limpiar localStorage y redirigir al login
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (!userData) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Menu />
      <Contenido />
    </>
  );
};

export default Dashboard;
