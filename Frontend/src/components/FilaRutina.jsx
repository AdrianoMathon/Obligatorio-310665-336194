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
      <td style={{ width: "80px" }}>
        {routine.imgUrl ? (
          <img 
            src={routine.imgUrl} 
            alt={routine.name}
            style={{ 
              width: "60px", 
              height: "60px", 
              objectFit: "cover", 
              borderRadius: "8px" 
            }}
          />
        ) : (
          <div 
            style={{ 
              width: "60px", 
              height: "60px", 
              backgroundColor: "#f8f9fa", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              borderRadius: "8px",
              border: "1px dashed #dee2e6"
            }}
          >
            📷
          </div>
        )}
      </td>
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
