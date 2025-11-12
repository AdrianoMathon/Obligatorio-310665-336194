import React from "react";
import { Button, Form } from "react-bootstrap";
import moment from "moment";

const EditarRutina = ({ routine, editForm, setEditForm, onSave, onCancel }) => {
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
          className="me-2"
          onClick={() => onSave(routine._id)}
          style={{
          background: 'var(--primary-color)',
          border: 'none',
          padding: '0.375rem 0.75rem'
        }}
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
