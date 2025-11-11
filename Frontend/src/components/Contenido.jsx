import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getRoutinesApi } from "../services/routineServices";
import { loadRoutines } from "../redux/features/routineSlice";
import { useTranslation } from "react-i18next";
import moment from "moment";
import Agregar from "./Agregar";
import MisRutinas from "./MisRutinas";
import FiltroRutinas from "./FiltroRutinas";

const Contenido = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const routines = useSelector((state) => state.routineSlice);
  
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState("all"); // "week", "month", "all"

  // Cargar rutinas al montar el componente
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
      console.log("error", error);
      // El backend devuelve { message: "..." }
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
    <div className="container mt-4">
      {/* Componente para agregar nuevas rutinas */}
      <Agregar />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Rutinas</h2>
        <FiltroRutinas filterPeriod={filterPeriod} setFilterPeriod={setFilterPeriod} />
      </div>

      <MisRutinas routines={filteredRoutines} />

      <div className="mt-3 text-muted">
        Mostrando {filteredRoutines.length} de {routines.length} rutinas
      </div>
    </div>
  );
};

export default Contenido;
