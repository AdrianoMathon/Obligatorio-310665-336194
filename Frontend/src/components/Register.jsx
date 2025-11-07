import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import { getRegisterSchema } from "../schemas/registerSchemas";
import { registerApi } from "../services/userServices";
import { jwtDecode } from "jwt-decode";

const initialValues = { 
  name: "", 
  email: "", 
  password: "",
  confirmPassword: "" 
};

const Register = () => {
  const { t, i18n } = useTranslation();

  const validationSchema = useMemo(() => {
    return getRegisterSchema(t);
  }, [i18n.language]);

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      console.log("valores del formulario", values);

      const { name, email, password } = values;
      
      // Llamada a la API de registro
      const { usuario, token } = await registerApi(name, email, password);
      console.log("Usuario registrado:", usuario);
      console.log("Token recibido:", token);

      // Decodificar el token
      const decoded = jwtDecode(token);
      console.log("Contenido del token:", decoded);

      const { id: userId, email: userEmail, perfil } = decoded;

      // Guardar en localStorage
      let localStorage = window.localStorage;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      toast.success(`¡Bienvenido ${name}! Tu cuenta ha sido creada exitosamente.`);

      actions.resetForm();

      // Auto-login: Redirigir al dashboard después del registro exitoso
      navigate("/dashboard");
    } catch (error) {
      console.log("error en registro", error);
      // Mostrar el error en la interfaz
      toast.error(error.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">{t("register.title")}</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, handleSubmit, handleChange, isValid, dirty }) => {
              // Verificar si las contraseñas coinciden
              const passwordsMatch = values.password && values.confirmPassword && 
                                    values.password === values.confirmPassword;
              
              // Deshabilitar botón si las contraseñas no coinciden o hay errores
              const isButtonDisabled = !passwordsMatch || !isValid || !dirty;

              return (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>{t("register.name")}</Form.Label>
                    <Field
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder={t("register.namePlaceholder")}
                      value={values.name}
                      onChange={handleChange}
                    />
                    {errors.name && touched.name && (
                      <p className="text-danger mt-1">{errors.name}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{t("register.email")}</Form.Label>
                    <Field
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder={t("register.emailPlaceholder")}
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <p className="text-danger mt-1">{errors.email}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>{t("register.password")}</Form.Label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder={t("register.passwordPlaceholder")}
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                      <p className="text-danger mt-1">{errors.password}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>{t("register.confirmPassword")}</Form.Label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                      placeholder={t("register.confirmPasswordPlaceholder")}
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-danger mt-1">{errors.confirmPassword}</p>
                    )}
                    {/* Mensaje cuando las contraseñas no coinciden */}
                    {values.password && values.confirmPassword && !passwordsMatch && (
                      <p className="text-warning mt-1">Las contraseñas no coinciden</p>
                    )}
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 mb-3"
                    disabled={isButtonDisabled}
                  >
                    {t("register.submit")}
                  </Button>

                  <div className="text-center">
                    <p>
                      {t("register.haveAccount")}{" "}
                      <a href="/login" className="text-decoration-none">
                        {t("register.loginLink")}
                      </a>
                    </p>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
