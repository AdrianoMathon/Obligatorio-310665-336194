import React, { useEffect, useState } from "react";
import { Card, ProgressBar, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import Grafica from "./Grafica";
import "../styles/informe-uso.css";

const InformeUso = () => {
  const routines = useSelector((state) => state.routineSlice);
  const { perfil } = useSelector((state) => state.userSlice);
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
    if (perfil === "PLUS" && routines.length > 0) {
      const porcentajeCalculado = (routines.length / 10) * 100;
      setPorcentaje(porcentajeCalculado);
    } else if (perfil === "PLUS") {
      setPorcentaje(0);
    }
  };

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
    <Card className="mb-4 mt-4">
      <Card.Header className="text-white informe-header">
        <h4 className="mb-0">📊 Informe de Uso</h4>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <h5>
            Perfil actual:{" "}
            <span className={`perfil-badge ${perfil === "PREMIUM" ? "perfil-badge-premium" : "perfil-badge-plus"}`}>
              {perfil}
            </span>
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
                className="progress-bar-custom"
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
                  nombreGrafica="Distribución de rutinas por categoría"
                  nombreDatos="Cantidad de rutinas"
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-3">
              <h6>Rutinas creadas: {routines.length}</h6>
              <div className="alert alert-success">
                Como usuario PREMIUM tienes rutinas ilimitadas
              </div>
            </div>

            {/* Gráfica de distribución por categoría para PREMIUM */}
            {routines.length > 0 && (
              <div className="mt-4">
                <Grafica
                  etiquetas={obtenerDatosGrafica().categorias}
                  datos={obtenerDatosGrafica().cantidades}
                  nombreGrafica="Distribución de rutinas por categoría"
                  nombreDatos="Cantidad de rutinas"
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
