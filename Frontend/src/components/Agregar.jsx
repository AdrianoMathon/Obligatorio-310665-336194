import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik, FieldArray } from "formik";
import { createRoutineApi, getCategoriesApi } from "../services/routineServices";
import { addRoutine } from "../redux/features/routineSlice";
import { routineSchema } from "../schemas/routineSchemas";
import RutinaInfoForm from "./RutinaInfoForm";
import EjercicioForm from "./EjercicioForm";
import SubirImagen from "./SubirImagen";
import { uploadImage } from "../services/imageService";

const Agregar = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const initialValues = {
    name: "",
    description: "",
    category: "",
    imgUrl: "",  
    exercises: [
      {
        name: "",
        sets: 0,
        reps: 0,
        weight: 0,
        muscle: ""
      }
    ]
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await getCategoriesApi();
      setCategories(cats);
    } catch (error) {
      // El backend devuelve { message: "..." }
      const errorMessage = error?.message || "Error al cargar categorías";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      
      // Si hay imagen en base64, subirla primero
      let finalValues = { ...values };
      
      if (values.imgUrl && values.imgUrl.startsWith('data:')) {
        try {
          toast.info("Subiendo imagen...");
          
          const result = await uploadImage(values.imgUrl);
          finalValues.imgUrl = result.secure_url;         
          toast.success("Imagen subida correctamente");
        } catch (imageError) {
          toast.error(`Error al subir la imagen: ${imageError.message}`);
          setSubmitting(false);
          return; // Detener el proceso si falla la imagen
        }
      }
      
      const newRoutine = await createRoutineApi(finalValues);
      
      dispatch(addRoutine(newRoutine));
      toast.success("¡Rutina creada exitosamente!");
      resetForm();
    } catch (error) {
      console.error("Error al crear rutina:", error);
      // El backend devuelve { message: "..." }
      const errorMessage = error?.message || "Error al crear rutina";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">Agregar Nueva Rutina</h4>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={routineSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              {/* Información básica de la rutina */}
              <RutinaInfoForm 
                categories={categories} 
                errors={errors} 
                touched={touched} 
              />

              {/* Subir imagen de la rutina */}
              <div className="mb-3">
                <label className="form-label">Imagen de la rutina (opcional)</label>
                <SubirImagen
                  handleImgURL={(auxImgUrl) => setFieldValue('imgUrl', auxImgUrl)}
                />
              </div>

              <hr />
              <h5>Ejercicios</h5>

              {/* Array de ejercicios */}
              <FieldArray name="exercises">
                {({ push, remove }) => (
                  <>
                    {values.exercises.map((exercise, index) => (
                      <EjercicioForm
                        key={index}
                        exercise={exercise}
                        index={index}
                        errors={errors}
                        touched={touched}
                        onRemove={remove}
                        canRemove={values.exercises.length > 1}
                      />
                    ))}

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        push({ name: "", sets: 0, reps: 0, weight: 0, muscle: "" })
                      }
                    >
                      ➕ Agregar otro ejercicio
                    </Button>
                  </>
                )}
              </FieldArray>

              <hr />

              <Button 
                variant="success" 
                type="submit" 
                className="w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "🔄 Creando rutina..." : "✅ Crear Rutina"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default Agregar;
