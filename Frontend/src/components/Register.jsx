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
import "../styles/auth.css";

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

      const { name, email, password } = values;
      
      // Llamada a la API de registro
      const { usuario, token } = await registerApi(name, email, password);

      // Decodificar el token
      const decoded = jwtDecode(token);

      const { id: userId, email: userEmail, perfil } = decoded;

      // Guardar en localStorage
      let localStorage = window.localStorage;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      toast.success(`¡Bienvenido ${name}! Tu cuenta ha sido creada exitosamente.`);

      actions.resetForm();

      // Auto-login: Redirigir al dashboard después del registro exitoso
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // Mostrar el error en la interfaz
      toast.error(error.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">{t("register.title")}</h1>
        <p className="auth-subtitle">Crea tu cuenta para comenzar</p>

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
                <Form.Group className="form-group" controlId="formBasicName">
                  <Form.Label className="form-label">{t("register.name")}</Form.Label>
                  <Field
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder={t("register.namePlaceholder")}
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && (
                    <p className="text-danger">{errors.name}</p>
                  )}
                </Form.Group>

                <Form.Group className="form-group" controlId="formBasicEmail">
                  <Form.Label className="form-label">{t("register.email")}</Form.Label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder={t("register.emailPlaceholder")}
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <p className="text-danger">{errors.email}</p>
                  )}
                </Form.Group>

                <Form.Group className="form-group" controlId="formBasicPassword">
                  <Form.Label className="form-label">{t("register.password")}</Form.Label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder={t("register.passwordPlaceholder")}
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <p className="text-danger">{errors.password}</p>
                  )}
                </Form.Group>

                <Form.Group className="form-group" controlId="formBasicConfirmPassword">
                  <Form.Label className="form-label">{t("register.confirmPassword")}</Form.Label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder={t("register.confirmPasswordPlaceholder")}
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-danger">{errors.confirmPassword}</p>
                  )}
                  {/* Indicador visual de contraseñas coincidentes */}
                  {values.password && values.confirmPassword && (
                    <div className={`password-match-indicator ${passwordsMatch ? 'success' : 'warning'}`}>
                      {passwordsMatch ? '✓ Las contraseñas coinciden' : '⚠ Las contraseñas no coinciden'}
                    </div>
                  )}
                </Form.Group>

                <button 
                  type="submit" 
                  className="auth-button"
                  disabled={isButtonDisabled}
                >
                  {t("register.submit")}
                </button>

                <div className="auth-link-container">
                  <p className="auth-link-text">
                    {t("register.haveAccount")}{" "}
                    <a href="/login" className="auth-link">
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
  );
};

export default Register;
