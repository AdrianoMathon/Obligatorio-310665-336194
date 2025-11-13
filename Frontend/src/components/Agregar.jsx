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
      
      // Resetear formulario
      resetForm();
      
      // Resetear componente de imagen
      if (subirImagenRef.current) {
        subirImagenRef.current.reset();
      }
    } catch (error) {
      console.error("Error al crear rutina:", error);

      const errorMessage = error?.message || "Error al crear rutina";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mb-4 mt-4">
      <Card.Header
        className="text-white"
        style={{
          background: 'var(--primary-gradient)',
        }}
      >
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
                  ref={subirImagenRef}
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
                style={{
                  fontFamily: 'var(--font-headings)',
                  fontWeight: '400',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '1.4rem'
                }}
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
