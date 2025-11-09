import * as Yup from 'yup';

export const routineSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres"),
  description: Yup.string()
    .max(200, "Máximo 200 caracteres"),
  category: Yup.string().required("La categoría es obligatoria"),
  exercises: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Nombre del ejercicio requerido"),
      sets: Yup.number()
        .integer("Debe ser un número entero")
        .min(1, "Mínimo 1 serie")
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value),
      reps: Yup.number()
        .integer("Debe ser un número entero")
        .min(1, "Mínimo 1 repetición")
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value),
      weight: Yup.number()
        .min(0, "No puede ser negativo")
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value),
      muscle: Yup.string()
    })
  )
});
