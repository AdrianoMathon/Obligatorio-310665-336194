import React from "react";
import { Button, Form } from "react-bootstrap";
import moment from "moment";
import "../styles/editar-rutina.css";

const EditarRutina = ({ routine, editForm, setEditForm, onSave, onCancel }) => {
  return (
    <>
      <td className="edit-image-cell">
        {routine.imgUrl ? (
          <img 
            src={routine.imgUrl} 
            alt={routine.name}
            className="edit-routine-image"
          />
        ) : (
          <div className="edit-routine-placeholder">
            📷
          </div>
        )}
      </td>
      <td>
        <Form.Control
          type="text"
          value={editForm.name}
          onChange={(e) =>
            setEditForm({ ...editForm, name: e.target.value })
          }
        />
      </td>
      <td>
        <Form.Control
          type="text"
          value={editForm.description}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              description: e.target.value,
            })
          }
        />
      </td>
      <td>
        <Form.Select
          value={editForm.category}
          onChange={(e) =>
            setEditForm({ ...editForm, category: e.target.value })
          }
        >
          <option value="FUERZA">FUERZA</option>
          <option value="CARDIO">CARDIO</option>
          <option value="FLEXIBILIDAD">FLEXIBILIDAD</option>
          <option value="FUNCIONAL">FUNCIONAL</option>
          <option value="HIIT">HIIT</option>
        </Form.Select>
      </td>
      <td>{routine.exercises?.length || 0}</td>
      <td>{moment(routine.createdAt).format("DD/MM/YYYY")}</td>
      <td>
        <Button
          variant="success"
          size="sm"
          className="me-2 btn-save-routine"
          onClick={() => onSave(routine._id)}
        >
          Guardar
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onCancel}
        >
          ❌ Cancelar
        </Button>
      </td>
    </>
  );
};

export default EditarRutina;
