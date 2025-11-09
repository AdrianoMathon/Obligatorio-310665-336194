import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { upgradeToPremiumApi } from "../services/userServices";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ModalConfirmacion from "./ModalConfirmacion";
import { useUserProfile } from "../utils/useUserProfile";

const CambioPlan = () => {
  const { perfil, actualizarPerfil } = useUserProfile();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleUpgradeToPremium = () => {
    setShowModal(true);
  };

  const confirmUpgrade = async () => {
    try {
      setLoading(true);
      setShowModal(false);
      const response = await upgradeToPremiumApi();
      
      // Guardar el nuevo token que viene del backend con el perfil actualizado
      if (response.token) {
        localStorage.setItem("token", response.token);
        
        // Decodificar el nuevo token para actualizar el estado local
        const decoded = jwtDecode(response.token);
        
        // Actualizar el perfil usando el custom hook
        actualizarPerfil();
        
        toast.success(response.message || "¡Upgrade a PREMIUM exitoso!");
        
        // Recargar la página para actualizar todos los componentes con el nuevo token
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error("Error: No se recibió el token actualizado");
      }
    } catch (error) {
      console.log("error", error);
      const errorMessage = error?.message || "Error al cambiar de plan";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const cancelUpgrade = () => {
    setShowModal(false);
  };

  return (
    <>
      <ModalConfirmacion
        show={showModal}
        onHide={cancelUpgrade}
        onConfirm={confirmUpgrade}
        titulo="Confirmar cambio de plan"
        mensaje="¿Estás seguro de que deseas cambiar a plan PREMIUM? Obtendrás rutinas ilimitadas y acceso completo a todas las funcionalidades."
        variante="success"
      />

      <Card className="mb-4">
      <Card.Header className="bg-warning text-dark">
        <h4 className="mb-0">⭐ Cambio de Plan</h4>
      </Card.Header>
      <Card.Body>
        {perfil === "PLUS" ? (
          <>
            <Alert variant="info">
              <h5>🎯 Plan Actual: PLUS</h5>
              <ul>
                <li>Hasta 10 rutinas</li>
                <li>Todas las funcionalidades básicas</li>
              </ul>
            </Alert>

            <Alert variant="success">
              <h5>✨ Beneficios del Plan PREMIUM</h5>
              <ul>
                <li>🚀 <strong>Rutinas ilimitadas</strong></li>
                <li>📊 Todas las funcionalidades</li>
                <li>🎁 Sin restricciones</li>
              </ul>
            </Alert>

            <div className="d-grid gap-2">
              <Button
                variant="success"
                size="lg"
                onClick={handleUpgradeToPremium}
                disabled={loading}
              >
                {loading ? "Procesando..." : "🌟 Cambiar a PREMIUM"}
              </Button>
            </div>
          </>
        ) : (
          <Alert variant="success">
            <h5>✅ Ya eres usuario PREMIUM</h5>
            <p className="mb-0">
              Disfrutas de todos los beneficios del plan más completo con
              rutinas ilimitadas.
            </p>
          </Alert>
        )}
      </Card.Body>
    </Card>
    </>
  );
};

export default CambioPlan;
