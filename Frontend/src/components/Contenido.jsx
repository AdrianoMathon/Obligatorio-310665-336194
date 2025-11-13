import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { getRoutinesApi } from "../services/routineServices";
import { loadRoutines } from "../redux/features/routineSlice";
import { useTranslation } from "react-i18next";
import moment from "moment";
import Agregar from "./Agregar";
import MisRutinas from "./MisRutinas";
import FiltroRutinas from "./FiltroRutinas";
import InformeUso from "./InformeUso";
import CambioPlan from "./CambioPlan";

const Contenido = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const routines = useSelector((state) => state.routineSlice);
  
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState("all"); 

  // Cargar rutinas 
  useEffect(() => {
    loadRoutinesFromApi();
  }, []);

  // Aplicar filtro cuando cambian las rutinas o el período
  useEffect(() => {
    applyFilter();
  }, [routines, filterPeriod]);

  const loadRoutinesFromApi = async () => {
    try {
      const data = await getRoutinesApi();
      dispatch(loadRoutines(data));
      toast.success("Rutinas cargadas correctamente");
    } catch (error) {
      const errorMessage = error?.message || "Error al cargar rutinas";
      toast.error(errorMessage);
    }
  };

  const applyFilter = () => {
    const now = moment();
    let filtered = routines;

    if (filterPeriod === "week") {
      filtered = routines.filter((routine) =>
        moment(routine.createdAt).isAfter(now.clone().subtract(7, "days"))
      );
    } else if (filterPeriod === "month") {
      filtered = routines.filter((routine) =>
        moment(routine.createdAt).isAfter(now.clone().subtract(30, "days"))
      );
    } else if (filterPeriod === "day") {
      filtered = routines.filter((routine) =>
        moment(routine.createdAt).isAfter(now.clone().subtract(1, "days"))
      );
    }

    setFilteredRoutines(filtered);
  };

  return (
    <>
      <Container className="mt-4 mb-4">
        <Row>
          <Col lg={8}>
            <Agregar />
          </Col>
          <Col lg={4}>
            <InformeUso />
            <CambioPlan />
          </Col>
        </Row>
      </Container>

      <Container className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Mis Rutinas</h2>
          <FiltroRutinas filterPeriod={filterPeriod} setFilterPeriod={setFilterPeriod} />
        </div>

        <MisRutinas routines={filteredRoutines} />

        <div className="mt-3 text-muted">
          Mostrando {filteredRoutines.length} de {routines.length} rutinas
        </div>
      </Container>
    </>
  );
};

export default Contenido;
