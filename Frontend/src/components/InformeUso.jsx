import React, { useEffect, useState } from "react";
import { Card, ProgressBar, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useUserProfile } from "../utils/useUserProfile";
import Grafica from "./Grafica";

const InformeUso = () => {
  const routines = useSelector((state) => state.routineSlice);
  const { perfil } = useUserProfile();
  const [limiteRutinas, setLimiteRutinas] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    // Establecer límite según perfil
    if (perfil === "PLUS") {
      setLimiteRutinas(10);
    } else if (perfil === "PREMIUM") {
      setLimiteRutinas(0); // 0 significa ilimitado
    }
  }, [perfil]);

  useEffect(() => {
    calcularPorcentaje();
  }, [routines, perfil]);

  const calcularPorcentaje = () => {
    // Calcular porcentaje para usuarios PLUS usando el estado de Redux
    if (perfil === "PLUS" && routines.length > 0) {
      const porcentajeCalculado = (routines.length / 10) * 100;
      setPorcentaje(porcentajeCalculado);
    } else if (perfil === "PLUS") {
      setPorcentaje(0);
    }
  };

  // Calcular distribución de rutinas por categoría
  const calcularDistribucionPorCategoria = () => {
    const distribucion = {};
    
    routines.forEach((routine) => {
      const categoria = routine.category || "Sin categoría";
      distribucion[categoria] = (distribucion[categoria] || 0) + 1;
    });

    return distribucion;
  };

  const obtenerDatosGrafica = () => {
    const distribucion = calcularDistribucionPorCategoria();
    const categorias = Object.keys(distribucion);
    const cantidades = Object.values(distribucion);

    return { categorias, cantidades };
  };

  const getVariantColor = () => {
    if (porcentaje < 50) return "success";
    if (porcentaje < 80) return "warning";
    return "danger";
  };

  return (
    <Card className="mb-4">
      <Card.Header className="bg-info text-white">
        <h4 className="mb-0">📊 Informe de Uso</h4>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <h5>
            Perfil actual:{" "}
            <Badge bg={perfil === "PREMIUM" ? "success" : "primary"}>
              {perfil}
            </Badge>
          </h5>
        </div>

        {perfil === "PLUS" ? (
          <>
            <div className="mb-3">
              <h6>
                Rutinas creadas: {routines.length} / {limiteRutinas}
              </h6>
              <ProgressBar
                now={porcentaje}
                label={`${Math.round(porcentaje)}%`}
                variant={getVariantColor()}
                style={{ height: "30px", fontSize: "1rem" }}
              />
            </div>

            {porcentaje >= 80 && (
              <div className="alert alert-warning">
                ⚠️ Estás llegando al límite de rutinas. Considera cambiar a
                PREMIUM para rutinas ilimitadas.
              </div>
            )}

            {/* Gráfica de distribución por categoría */}
            {routines.length > 0 && (
              <div className="mt-4">
                <Grafica
                  etiquetas={obtenerDatosGrafica().categorias}
                  datos={obtenerDatosGrafica().cantidades}
                  nombreGrafica="Distribución de Rutinas por Categoría"
                  nombreDatos="Cantidad de Rutinas"
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-3">
              <h6>Rutinas creadas: {routines.length}</h6>
              <div className="alert alert-success">
                ✨ Como usuario PREMIUM tienes rutinas ilimitadas
              </div>
            </div>

            {/* Gráfica de distribución por categoría para PREMIUM */}
            {routines.length > 0 && (
              <div className="mt-4">
                <Grafica
                  etiquetas={obtenerDatosGrafica().categorias}
                  datos={obtenerDatosGrafica().cantidades}
                  nombreGrafica="Distribución de Rutinas por Categoría"
                  nombreDatos="Cantidad de Rutinas"
                />
              </div>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default InformeUso;
