import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Field } from "formik";

/**
 * Componente para la información básica de una rutina
 * @param {Array} categories - Array de categorías disponibles
 * @param {Object} errors - Objeto de errores de Formik
 * @param {Object} touched - Objeto de campos tocados de Formik
 */
const RutinaInfoForm = ({ categories, errors, touched }) => {
  return (
    <>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la Rutina *</Form.Label>
            <Field
              name="name"
              type="text"
              className="form-control"
              placeholder="Ej: Rutina de Fuerza"
              maxLength={50}
            />
            {errors.name && touched.name && (
              <div className="text-danger">{errors.name}</div>
            )}
            <Form.Text className="text-muted">
              Máximo 50 caracteres
            </Form.Text>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Categoría *</Form.Label>
            <Field
              as="select"
              name="category"
              className="form-control"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Field>
            {errors.category && touched.category && (
              <div className="text-danger">{errors.category}</div>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Field
          name="description"
          as="textarea"
          rows={3}
          className="form-control"
          placeholder="Descripción de la rutina..."
          maxLength={200}
        />
        <Form.Text className="text-muted">
          Máximo 200 caracteres
        </Form.Text>
      </Form.Group>
    </>
  );
};

export default RutinaInfoForm;
