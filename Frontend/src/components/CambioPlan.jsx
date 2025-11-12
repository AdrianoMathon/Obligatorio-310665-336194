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
        <Card.Header
          className="text-white"
          style={{
            background: 'var(--terciary-gradient)',
          }}>
          <h4 className="mb-0">⭐ Cambio de Plan</h4>

        </Card.Header>
        <Card.Body>
          {perfil === "PLUS" ? (
            <>
              <Card
                style={{
                  backgroundColor: '#e08e0017',
                  marginBottom: '10px',
                }}
              >
                <Card.Body>
                  <h5 style={{ marginBottom: '10px' }}>Plan actual: PLUS</h5>
                  <ul style={{ marginBottom: '0' }}>
                    <li>Hasta 10 rutinas</li>
                    <li>Todas las funcionalidades básicas</li>
                  </ul>
                </Card.Body>
              </Card>

              <Card 
                style={{
                  backgroundColor: '#e08e0017',
                  border: '2px solid var(--terciary-color)',
                  borderLeft: '6px solid var(--terciary-color)',
                  marginBottom: '15px'
                }}
              >
                <Card.Body>
                  <h5 style={{ marginBottom: '10px' }}>Beneficios del Plan PREMIUM</h5>
                  <ul style={{ marginBottom: '0' }}>
                    <li><strong>Rutinas ilimitadas</strong></li>
                    <li>Todas las funcionalidades</li>
                    <li>Sin restricciones</li>
                  </ul>
                </Card.Body>
              </Card>

              <div className="d-grid gap-2">
                <Button        
                  size="lg"
                  onClick={handleUpgradeToPremium}
                  disabled={loading}
                  style={{
                    fontFamily: 'var(--font-headings)',
                    backgroundColor: 'var(--primary-gradient)',
                    fontWeight: '400',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    
                  }}
                >
                  {loading ? "Procesando..." : "🌟 Cambiar a PREMIUM"}
                </Button>
              </div>
            </>
          ) : (
            <Card variant="success"
            style={{
                  backgroundColor: '#f7ff8717',
                  border: '2px solid var(--primary-color)',
                  borderLeft: '6px solid var(--primary-color)',
                  marginBottom: '15px',
                  padding: '15px'
                }}>
              <h5>✅ Ya eres usuario PREMIUM</h5>
              <p className="mb-0">
                Disfrutas de todos los beneficios del plan más completo con
                rutinas ilimitadas.
              </p>
            </Card>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CambioPlan;
