import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/features/userSlice";
import "../styles/menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { perfil, email } = useSelector((state) => state.userSlice);
  
  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Limpiar estado de Redux
    dispatch(clearUser());

    toast.info("Sesión cerrada exitosamente");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/dashboard">
          <span className="navbar-brand-title">Fitness Routines</span> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link href="/dashboard" className="text-white me-3">
              📊 Dashboard
            </Nav.Link>
            <div className="text-white me-3 user-info">
              {email && <span>👤 {email}</span>}
              {perfil && (
                <span className={`user-badge ${perfil === "PREMIUM" ? "user-badge-premium" : "user-badge-plus"}`}>
                  {perfil}
                </span>
              )}
            </div>
            <Button 
              variant="outline-light" 
              size="mlg"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
