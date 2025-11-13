import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { upgradeToPremiumApi } from "../services/userServices";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/features/userSlice";
import ModalConfirmacion from "./ModalConfirmacion";
import "../styles/cambio-plan.css";

const CambioPlan = () => {
  const { perfil } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
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

        dispatch(updateUser());

        toast.success(response.message || "¡Upgrade a PREMIUM exitoso!");
      } else {
        toast.error("Error: No se recibió el token actualizado");
      }
    } catch (error) {
      console.log("error", error);
      const errorMessage = error?.message || "Error al cambiar de plan";
      toast.error(errorMessage);
    } finally {
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
        <Card.Header className="text-white cambio-plan-header">
          <h4 className="mb-0">⭐ Cambio de Plan</h4>
        </Card.Header>
        <Card.Body>
          {perfil === "PLUS" ? (
            <>
              <Card className="plan-card-plus">
                <Card.Body>
                  <h5 className="plan-title">Plan actual: PLUS</h5>
                  <ul className="plan-list">
                    <li>Hasta 10 rutinas</li>
                    <li>Todas las funcionalidades básicas</li>
                  </ul>
                </Card.Body>
              </Card>

              <Card className="plan-card-premium">
                <Card.Body>
                  <h5 className="plan-title">Beneficios del Plan PREMIUM</h5>
                  <ul className="plan-list">
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
                  className="btn-upgrade-premium"
                >
                  {loading ? "Procesando..." : "🌟 Cambiar a PREMIUM"}
                </Button>
              </div>
            </>
          ) : (
            <Card className="premium-status-card">
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
