import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

/**
 * Custom hook para manejar el perfil del usuario desde el token JWT
 * @returns {Object} Objeto con perfil, userId, email, loading y función actualizarPerfil
 */
export const useUserProfile = () => {
  const [perfil, setPerfil] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        setPerfil(decoded.perfil?.[0] || "PLUS");
        setUserId(decoded.id);
        setEmail(decoded.email);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error al cargar perfil");
    } finally {
      setLoading(false);
    }
  };

  const actualizarPerfil = () => {
    cargarPerfil();
  };

  return { perfil, userId, email, loading, actualizarPerfil };
};
