# Usuarios de Prueba

Estos son los usuarios de prueba disponibles para testing:

## 📋 Lista de usuarios:

### Usuario Regular 1

- **Email:** juan@test.com
- **Password:** test123
- **Nombre:** Juan Pérez
- **Roles:** USER

### Usuario Regular 2

- **Email:** maria@test.com
- **Password:** test123
- **Nombre:** María García
- **Roles:** USER

### Administrador

- **Email:** admin@test.com
- **Password:** test123
- **Nombre:** Carlos Admin
- **Roles:** ADMIN

### Usuario Regular 3

- **Email:** ana@test.com
- **Password:** test123
- **Nombre:** Ana López
- **Roles:** USER

### Super Admin

- **Email:** luis@test.com
- **Password:** test123
- **Nombre:** Luis Martínez
- **Roles:** ADMIN, USER

## 🔐 Información importante:

- **Todas las contraseñas están hasheadas** en el archivo JSON usando bcrypt
- **Contraseña original:** `test123` para todos los usuarios
- **Hash usado:** `$2b$10$K1VhL8Qy3pYLJpXKHpUzAO3qLQD1F7B9xvU4lKpG2JzVhM6Q8nWzm`

## 🚀 Cómo usar:

1. Para **login**, usa cualquier email de la lista con la contraseña `test123`
2. Para **registro**, usa un email diferente a los listados
3. El sistema retornará un JWT token válido al hacer login exitoso

## 📡 Endpoints para probar:

```
POST /signup - Crear nuevo usuario
POST /login  - Iniciar sesión
```
