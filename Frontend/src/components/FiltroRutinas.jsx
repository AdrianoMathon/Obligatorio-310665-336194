import React from "react";
import { Form } from "react-bootstrap";
import "../styles/filtro-rutinas.css";

const FiltroRutinas = ({ filterPeriod, setFilterPeriod }) => {
  return (
    <div>
      <Form.Label className="me-2">Filtrar por:</Form.Label>
      <Form.Select
        value={filterPeriod}
        onChange={(e) => setFilterPeriod(e.target.value)}
        className="filter-select"
      >
        <option value="all">Todo el histórico</option>
        <option value="week">Última semana</option>
        <option value="month">Último mes</option>
        <option value="day">Último día</option>
      </Form.Select>
    </div>
  );
};

export default FiltroRutinas;
