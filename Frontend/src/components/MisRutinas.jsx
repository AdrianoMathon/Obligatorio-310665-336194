import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteRoutineApi, updateRoutineApi } from "../services/routineServices";
import { deleteRoutine, updateRoutine } from "../redux/features/routineSlice";
import { Table } from "react-bootstrap";
import FilaRutina from "./FilaRutina";
import EditarRutina from "./EditarRutina";
import ModalConfirmacion from "./ModalConfirmacion";

const MisRutinas = ({ routines }) => {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);

  const handleDelete = async (id) => {
    setRoutineToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteRoutineApi(routineToDelete);
      dispatch(deleteRoutine(routineToDelete));
      toast.success("Rutina eliminada correctamente");
      setShowModal(false);
      setRoutineToDelete(null);
    } catch (error) {
      console.log("error", error);
      // El backend devuelve { message: "..." }
      const errorMessage = error?.message || "Error al eliminar rutina";
      toast.error(errorMessage);
      setShowModal(false);
      setRoutineToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setRoutineToDelete(null);
  };

  const startEdit = (routine) => {
    setEditingId(routine._id);
    setEditForm({
      name: routine.name,
      description: routine.description || "",
      category: routine.category
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id) => {
    try {
      const updated = await updateRoutineApi(id, editForm);
      dispatch(updateRoutine(updated));
      toast.success("Rutina actualizada correctamente");
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.log("error", error);
      // El backend devuelve { message: "..." }
      const errorMessage = error?.message || "Error al actualizar rutina";
      toast.error(errorMessage);
    }
  };

  if (routines.length === 0) {
    return (
      <div className="alert alert-info">
        No tienes rutinas registradas. ¡Crea tu primera rutina!
      </div>
    );
  }

  return (
    <>
      <ModalConfirmacion
        show={showModal}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
        titulo="Confirmar eliminación"
        mensaje="¿Estás seguro de que deseas eliminar esta rutina? Esta acción no se puede deshacer."
        variante="danger"
      />

      <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Ejercicios</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {routines.map((routine) => (
          <tr key={routine._id}>
            {editingId === routine._id ? (
              <EditarRutina
                routine={routine}
                editForm={editForm}
                setEditForm={setEditForm}
                onSave={saveEdit}
                onCancel={cancelEdit}
              />
            ) : (
              <FilaRutina
                routine={routine}
                onEdit={startEdit}
                onDelete={handleDelete}
              />
            )}
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
};

export default MisRutinas;
