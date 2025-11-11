import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { Field } from "formik";

const EjercicioForm = ({ exercise, index, errors, touched, onRemove, canRemove }) => {
  return (
    <Card className="mb-3 bg-light">
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Nombre del Ejercicio *</Form.Label>
              <Field
                name={`exercises.${index}.name`}
                type="text"
                className="form-control"
                placeholder="Ej: Press de Banca"
              />
              {errors?.exercises?.[index]?.name && touched?.exercises?.[index]?.name && (
                <div className="text-danger">{errors.exercises[index].name}</div>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Músculo</Form.Label>
              <Field
                name={`exercises.${index}.muscle`}
                type="text"
                className="form-control"
                placeholder="Ej: Pectorales"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label>Series</Form.Label>
              <Field
                name={`exercises.${index}.sets`}
                type="number"
                className="form-control"
                min="1"
              />
              {errors?.exercises?.[index]?.sets && touched?.exercises?.[index]?.sets && (
                <div className="text-danger">{errors.exercises[index].sets}</div>
              )}
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label>Repeticiones</Form.Label>
              <Field
                name={`exercises.${index}.reps`}
                type="number"
                className="form-control"
                min="1"
              />
              {errors?.exercises?.[index]?.reps && touched?.exercises?.[index]?.reps && (
                <div className="text-danger">{errors.exercises[index].reps}</div>
              )}
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label>Peso (kg)</Form.Label>
              <Field
                name={`exercises.${index}.weight`}
                type="number"
                className="form-control"
                min="0"
                step="0.5"
              />
              {errors?.exercises?.[index]?.weight && touched?.exercises?.[index]?.weight && (
                <div className="text-danger">{errors.exercises[index].weight}</div>
              )}
            </Form.Group>
          </Col>
        </Row>

        {canRemove && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onRemove(index)}
          >
            🗑️ Eliminar ejercicio
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default EjercicioForm;
