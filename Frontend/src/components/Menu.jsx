import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useUserProfile } from "../utils/useUserProfile";

const Menu = () => {
  const navigate = useNavigate();
  const { perfil, email } = useUserProfile();
  
  const handleLogout = () => {
    let localStorage = window.localStorage;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    toast.info("Sesión cerrada exitosamente");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/dashboard">
          <span style={{ fontSize: "1.8rem" }}>Fitness Routines</span> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link href="/dashboard" className="text-white me-3">
              📊 Dashboard
            </Nav.Link>
            <div className="text-white me-3" style={{ fontSize: "0.9rem" }}>
              {email && <span>👤 {email}</span>}
              {perfil && (
                <span style={{
                backgroundColor: perfil === "PREMIUM" ? "var(--primary-color)" : "var(--quaternary-color)",
                color: "white",
                padding: "0.35em 0.65em",
                borderRadius: "0.375rem",
                fontSize: "0.875em",
                fontWeight: "700",
                marginLeft: "10px",
                display: "inline-block"
              }}>
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
