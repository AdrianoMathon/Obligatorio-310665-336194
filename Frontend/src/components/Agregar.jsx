import React, { useState, useEffect, useRef } from "react";
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
import "../styles/agregar.css";

const Agregar = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const subirImagenRef = useRef(); 

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
      const errorMessage = error?.message || "Error al cargar categorías";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);

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
      
      // Resetear formulario
      resetForm();
      
      // Resetear componente de imagen
      if (subirImagenRef.current) {
        subirImagenRef.current.reset();
      }
    } catch (error) {
      const errorMessage = error?.message || "Error al crear rutina";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mb-4 mt-4">
      <Card.Header className="text-white agregar-header">
        <h4 className="mb-0">💪 Agregar Nueva Rutina</h4>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={routineSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>

              <RutinaInfoForm
                categories={categories}
                errors={errors}
                touched={touched}
              />

              <div className="mb-3">
                <label className="form-label">Imagen de la rutina (opcional)</label>
                <SubirImagen
                  ref={subirImagenRef}
                  handleImgURL={(auxImgUrl) => setFieldValue('imgUrl', auxImgUrl)}
                />
              </div>

              <hr />
              <h5>Ejercicios</h5>

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
                      className="btn-secundario"
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
                type="submit"
                className="w-100 btn-create-routine"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "🔄 Creando rutina..." : "Crear Rutina"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default Agregar;
