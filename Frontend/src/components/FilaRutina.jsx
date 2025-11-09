import React from "react";
import { Button, Badge } from "react-bootstrap";
import moment from "moment";

const FilaRutina = ({ routine, onEdit, onDelete }) => {
  const getCategoryBadge = (category) => {
    const colors = {
      FUERZA: "primary",
      CARDIO: "danger",
      FLEXIBILIDAD: "success",
      FUNCIONAL: "warning",
      HIIT: "info"
    };
    return <Badge bg={colors[category] || "secondary"}>{category}</Badge>;
  };

  return (
    <>
      <td>{routine.name}</td>
      <td>{routine.description || "-"}</td>
      <td>{getCategoryBadge(routine.category)}</td>
      <td>{routine.exercises?.length || 0}</td>
      <td>{moment(routine.createdAt).format("DD/MM/YYYY")}</td>
      <td>
        <Button
          variant="warning"
          size="sm"
          className="me-2"
          onClick={() => onEdit(routine)}
        >
          ✏️ Editar
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(routine._id)}
        >
          🗑️ Eliminar
        </Button>
      </td>
    </>
  );
};

export default FilaRutina;
