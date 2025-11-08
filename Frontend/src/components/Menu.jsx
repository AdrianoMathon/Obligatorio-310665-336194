import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Menu = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    let localStorage = window.localStorage;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    toast.info("Sesión cerrada exitosamente");
    navigate("/login");
  };

  return (
    <div className="menu">
      <h2>Rutinas App</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link> | 
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Menu;
