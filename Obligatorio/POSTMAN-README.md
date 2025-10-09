# 📋 Colección Postman - Obligatorio Full Stack

**Estudiantes:** 310665 - 336194  
**Materia:** Desarrollo Full Stack  
**API:** Sistema de Gestión de Rutinas de Ejercicios

## 🎯 Descripción

Esta colección de Postman contiene todos los endpoints y casos de prueba para el sistema de gestión de rutinas de ejercicios. Incluye tests completos para autenticación, CRUD de rutinas, validaciones, y límites por tipo de usuario.

## 📁 Estructura de la Colección

### 1. **Authentication** 
- ✅ Registro exitoso (con datos aleatorios)
- ❌ Registro con datos incorrectos
- ❌ Registro de usuario duplicado  
- ✅ Login exitoso
- ❌ Login con credenciales incorrectas

### 2. **Users**
- ✅ Upgrade de PLUS a PREMIUM
- ❌ Intento de upgrade desde cuenta ya PREMIUM

### 3. **Routines**
- ✅ Obtener categorías disponibles
- ✅ Crear rutina exitosa
- ❌ Crear rutina con datos inválidos
- ✅ Obtener rutinas del usuario
- ✅ Obtener rutina por ID (propia)
- ❌ Obtener rutina de otro usuario (403)
- ✅ Actualizar rutina existente
- ✅ Eliminar rutina
- ✅ Contar rutinas del usuario
- ❌ Acceso sin token (401)
- ❌ Acceso con token inválido (401)
- ❌ Obtener rutina inexistente (404)

### 4. **Tests de Límites PLUS/PREMIUM**
- ✅ Crear rutinas 1-10 como PLUS (límite: 10)
- ❌ Crear rutina 11 como PLUS (error límite)
- ✅ Upgrade a PREMIUM
- ✅ Crear rutina 11 como PREMIUM (sin límite)

### 5. **Tests de Validación y Bordes**
- ❌ Ejercicio sin sets requeridos
- ❌ Categoría inválida
- ❌ Rutina sin ejercicios
- ⚠️ Edge case: Sets y reps en 0

## 🔧 Variables de Colección

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `dev_base_url` | URL base del servidor de desarrollo | `http://localhost:3000/api/v1` |
| `prod_base_url` | URL base del servidor de producción | `https://tu-app.vercel.app/api/v1` |
| `token` | Token JWT del usuario PLUS | `eyJhbGciOiJIUzI1NiIs...` |
| `token_premium` | Token JWT del usuario PREMIUM | `eyJhbGciOiJIUzI1NiIs...` |
| `userId` | ID del usuario autenticado | `507f1f77bcf86cd799439011` |
| `userEmail` | Email del usuario | `user123@mail.com` |
| `routineId` | ID de la rutina creada | `507f1f77bcf86cd799439012` |
| `randomName` | Nombre aleatorio generado | `John Doe` |
| `randomEmail` | Email aleatorio generado | `user1697123456@mail.com` |
| `randomPassword` | Contraseña aleatoria generada | `Password1234` |

## 🚀 Cómo Ejecutar

### Opción 1: Desde Postman (Recomendado)
1. Importa la colección `Obligatorio-FS-310665-336194.postman_collection.json`
2. Asegúrate de que tu servidor esté corriendo en `http://localhost:3000`
3. Ejecuta "Run Collection" para todos los tests
4. Los datos se generan automáticamente con scripts

### Opción 2: Desde línea de comandos (Newman)
```bash
# Instalar Newman (solo una vez)
npm install -g newman newman-reporter-htmlextra

# Ejecutar la colección
newman run Obligatorio-FS-310665-336194.postman_collection.json \
  --environment postman-environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export results.html
```

### Opción 3: Script automatizado
```bash
# Usar el script incluido
node test-runner.js
```

## ⚙️ Configuración del Servidor

Antes de ejecutar los tests, asegúrate de:

1. **Servidor corriendo:**
   ```bash
   npm start
   # Servidor en http://localhost:3000
   ```

2. **Base de datos conectada:**
   - MongoDB Atlas configurado
   - Variables de entorno en `.env`

3. **Endpoints disponibles:**
   - `/api/v1/public/signup`
   - `/api/v1/public/login`
   - `/api/v1/users/upgrade-premium`
   - `/api/v1/routines/*`

## 📊 Casos de Prueba Cubiertos

### ✅ Funcionalidad Básica
- [x] Registro y login de usuarios
- [x] CRUD completo de rutinas
- [x] Autenticación JWT
- [x] Autorización por usuario

### ✅ Validaciones
- [x] Validación de datos de entrada (JOI)
- [x] Validación de esquemas (Mongoose)
- [x] Manejo de errores HTTP (400, 401, 403, 404, 409)

### ✅ Lógica de Negocio
- [x] Límites por tipo de usuario (PLUS: 10, PREMIUM: ∞)
- [x] Upgrade de perfil PLUS → PREMIUM
- [x] Rutinas propias vs ajenas
- [x] Categorías de ejercicios válidas

### ✅ Seguridad
- [x] Protección de rutas con JWT
- [x] Validación de tokens
- [x] Hash de contraseñas (bcrypt)
- [x] Autorización por recursos

## 🏆 Resultados Esperados

Al ejecutar la colección completa, deberías ver:

```
📊 RESUMEN DE EJECUCIÓN:
═══════════════════════════════════════════
📁 Colección: Obligatorio-FS-310665-336194
🔢 Total de requests: ~25
✅ Requests exitosos: ~20
❌ Requests fallidos: ~5 (intencionalmente)
🧪 Total de tests: ~30
✅ Tests pasados: ~30
❌ Tests fallidos: 0
```

Los "requests fallidos" son **intencionalmente fallidos** (tests de validación que esperan errores 400/401/403).

## 🐛 Troubleshooting

### Problema: Tests fallan masivamente
**Solución:** Verifica que el servidor esté corriendo en `http://localhost:3000`

### Problema: "Usuario ya existe"
**Solución:** Los scripts generan emails únicos automáticamente con timestamp

### Problema: "Token inválido"
**Solución:** Ejecuta los tests en orden secuencial para que se generen los tokens correctos

### Problema: "Límite PLUS no funciona"
**Solución:** Verifica que el usuario tenga perfil ["PLUS"] y no ["PREMIUM"]

## 📚 Documentación Adicional

- **Swagger/OpenAPI:** `http://localhost:3000/api-docs` (si está configurado)
- **Código fuente:** Ver carpetas `src/controllers/`, `src/routes/`, `src/validations/`
- **Base de datos:** MongoDB Atlas con colecciones `users` y `routines`

---

**Nota:** Esta colección está diseñada para demostrar el cumplimiento completo de todos los requisitos del obligatorio, incluyendo casos de éxito, validaciones, límites de negocio y manejo de errores.