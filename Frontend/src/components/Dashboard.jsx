import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

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
    <Container className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">Dashboard de Gestión</h2>
            </Card.Header>
            <Card.Body>
              <h4 className="mb-4">¡Bienvenido al Dashboard!</h4>
              
              <div className="mb-4">
                <h5>Información del Usuario:</h5>
                <ul className="list-unstyled">
                  <li><strong>Email:</strong> {userData.email}</li>
                  <li><strong>ID:</strong> {userData.id}</li>
                  <li>
                    <strong>Perfil:</strong>{" "}
                    {userData.perfil && userData.perfil.length > 0
                      ? userData.perfil.join(", ")
                      : "BASIC"}
                  </li>
                </ul>
              </div>

              <div className="alert alert-info">
                <strong>Nota:</strong> Esta es tu área de gestión. Aquí podrás 
                gestionar tus rutinas y configuraciones.
              </div>

              <Button variant="danger" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
