import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'es',
  resources: {
    es: { 
      translation: { 
        hello: 'Hola',
        welcome: 'Bienvenido',
        login: {
          title: 'Iniciar Sesión',
          email: 'Correo electrónico',
          emailPlaceholder: 'Ingrese su correo',
          password: 'Contraseña',
          passwordPlaceholder: 'Ingrese su contraseña',
          submit: 'Iniciar Sesión',
          noAccount: '¿No tienes cuenta?',
          registerLink: 'Regístrate aquí'
        },
        register: {
          title: 'Registro de Usuario',
          name: 'Nombre',
          namePlaceholder: 'Ingrese su nombre',
          email: 'Correo electrónico',
          emailPlaceholder: 'Ingrese su correo',
          password: 'Contraseña',
          passwordPlaceholder: 'Ingrese su contraseña',
          confirmPassword: 'Confirmar Contraseña',
          confirmPasswordPlaceholder: 'Confirme su contraseña',
          submit: 'Registrarse',
          haveAccount: '¿Ya tienes cuenta?',
          loginLink: 'Inicia sesión aquí'
        },
        validations: {
          min: 'Debe tener al menos {{min}} caracteres',
          max: 'Debe tener máximo {{max}} caracteres',
          email_invalid: 'El correo electrónico no es válido',
          email_required: 'El correo electrónico es obligatorio',
          password_required: 'La contraseña es obligatoria',
          password_strong: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
          password_match: 'Las contraseñas no coinciden',
          confirm_password_required: 'Debe confirmar la contraseña',
          name_required: 'El nombre es obligatorio'
        }
      } 
    },
    en: { 
      translation: { 
        hello: 'Hello',
        welcome: 'Welcome',
        login: {
          title: 'Login',
          email: 'Email',
          emailPlaceholder: 'Enter your email',
          password: 'Password',
          passwordPlaceholder: 'Enter your password',
          submit: 'Login',
          noAccount: "Don't have an account?",
          registerLink: 'Register here'
        },
        register: {
          title: 'User Registration',
          name: 'Name',
          namePlaceholder: 'Enter your name',
          email: 'Email',
          emailPlaceholder: 'Enter your email',
          password: 'Password',
          passwordPlaceholder: 'Enter your password',
          confirmPassword: 'Confirm Password',
          confirmPasswordPlaceholder: 'Confirm your password',
          submit: 'Sign Up',
          haveAccount: 'Already have an account?',
          loginLink: 'Login here'
        },
        validations: {
          min: 'Must be at least {{min}} characters',
          max: 'Must be maximum {{max}} characters',
          email_invalid: 'The email is not valid',
          email_required: 'Email is required',
          password_required: 'Password is required',
          password_strong: 'Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character',
          password_match: 'Passwords do not match',
          confirm_password_required: 'You must confirm the password',
          name_required: 'Name is required'
        }
      } 
    }
  },
  interpolation: { escapeValue: false }
})
export default i18n