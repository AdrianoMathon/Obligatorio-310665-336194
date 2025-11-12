import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import { getLoginSchema } from "../schemas/loginSchemas";
import { loginApi } from "../services/userServices";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import "../styles/auth.css";

const initialValues = { email: "", password: "" };

const Login = () => {
  const { t, i18n } = useTranslation();

  const validationSchema = useMemo(() => {
    return getLoginSchema(t);
  }, [i18n.language]);

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      console.log("valores del formulario", values);

      const { email, password } = values;
      const { token } = await loginApi(email, password);
      console.log("token", token);

      let localStorage = window.localStorage;

      const decoded = jwtDecode(token);
      console.log("Contenido del token:", decoded);

      const { exp, iat, id: userId, email: userEmail, perfil } = decoded;

      console.log("decodificado ", exp, userId, userEmail, perfil);

      const expirationTime = moment.unix(exp);
      const createTime = moment.unix(iat);

      console.log("createTime", createTime);

      const now = moment();

      const diffMinutes = expirationTime.diff(now, "minutes");
      const diffSeconds = expirationTime.diff(now, "seconds");

      console.log(diffMinutes, diffSeconds);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      toast.info(`¡Bienvenido de nuevo!`);

      actions.resetForm();

      // Redirigir al dashboard después del login exitoso
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log("error", error);
      // Mostrar el error en la interfaz
      toast.error(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">{t("login.title")}</h1>
        <p className="auth-subtitle">Ingresa tus datos para continuar</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => {
            // Deshabilitar botón si algún campo está vacío
            const isButtonDisabled = !values.email || !values.password;

            return (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group" controlId="formBasicEmail">
                  <Form.Label className="form-label">{t("login.email")}</Form.Label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder={t("login.emailPlaceholder")}
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <p className="text-danger">{errors.email}</p>
                  )}
                </Form.Group>

                <Form.Group className="form-group" controlId="formBasicPassword">
                  <Form.Label className="form-label">{t("login.password")}</Form.Label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder={t("login.passwordPlaceholder")}
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <p className="text-danger">{errors.password}</p>
                  )}
                </Form.Group>

                <button 
                  type="submit" 
                  className="auth-button"
                  disabled={isButtonDisabled}
                >
                  {t("login.submit")}
                </button>

                <div className="auth-link-container">
                  <p className="auth-link-text">
                    {t("login.noAccount")}{" "}
                    <a href="/register" className="auth-link">
                      {t("login.registerLink")}
                    </a>
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>

        <div className="language-switcher">
          <button 
            className="language-button"
            onClick={() => i18n.changeLanguage("es")}
          >
            🇪🇸 Español
          </button>
          <button 
            className="language-button"
            onClick={() => i18n.changeLanguage("en")}
          >
            🇺🇸 English
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
