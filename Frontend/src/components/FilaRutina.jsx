import React from "react";
import { Button, Badge } from "react-bootstrap";
import moment from "moment";
import "../styles/fila-rutina.css";

const FilaRutina = ({ routine, onEdit, onDelete }) => {
  const getCategoryClass = (category) => {
    const classes = {
      FUERZA: "category-badge-fuerza",
      CARDIO: "category-badge-cardio",
      FLEXIBILIDAD: "category-badge-flexibilidad",
      FUNCIONAL: "category-badge-funcional",
      HIIT: "category-badge-hiit", 
    };

    return classes[category] || "";
  };

  return (
    <>
      <td className="routine-image-cell">
        {routine.imgUrl ? (
          <img
            src={routine.imgUrl}
            alt={routine.name}
            className="routine-image"
          />
        ) : (
          <div className="routine-placeholder">
            📷
          </div>
        )}
      </td>
      <td>{routine.name}</td>
      <td>{routine.description || "-"}</td>
      <td>
        <span className={`category-badge ${getCategoryClass(routine.category)}`}>
          {routine.category}
        </span>
      </td>
      <td>{routine.exercises?.length || 0}</td>
      <td>{moment(routine.createdAt).format("DD/MM/YYYY")}</td>
      <td>
        <Button
          variant="warning"
          size="sm"
          className="me-2 btn-edit-routine"
          onClick={() => onEdit(routine)}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(routine._id)}
        >
          Eliminar
        </Button>
      </td>
    </>
  );
};

export default FilaRutina;
