# 📋 Guía Completa de Testing con Postman - API Gimnasio

## 🔧 Configuración Inicial de Postman

### 1. Crear Nueva Colección
- Crear una nueva colección llamada **"Gimnasio API"**

### 2. Configurar Variables de Entorno
Crear un nuevo entorno con las siguientes variables:
- `baseURL`: `http://localhost:3000/api/v1`
- `token`: (se actualizará automáticamente tras el login)
- `userId`: (se obtendrá del response de login)
- `routineId`: (se obtendrá al crear una rutina)

---

## 📚 Estructura de la API

### Rutas Disponibles:
- **Públicas**: `/api/v1/` (signup, login)
- **Usuarios**: `/api/v1/users/` (upgrade premium)
- **Rutinas**: `/api/v1/routines/` (CRUD completo)

---

## 🔓 ENDPOINTS PÚBLICOS
*(No requieren autenticación)*

### 1. 📝 Registro de Usuario
```http
POST {{baseURL}}/signup
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "123456",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

**Respuesta esperada:** `201 Created`

**Ejemplo de Response:**
```json
{
  "message": "Usuario creado exitosamente",
  "userId": "64f123abc456def789012345"
}
```

---

### 2. 🔑 Login de Usuario
```http
POST {{baseURL}}/login
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "123456"
}
```

**Respuesta esperada:** `200 OK`

**⚠️ IMPORTANTE - Script Post-Response:**
En la pestaña **"Tests"** del request de login, agregar:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("token", response.token);
    pm.environment.set("userId", response.user.id);
    console.log("Token guardado:", response.token);
}
```

**Ejemplo de Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f123abc456def789012345",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "profile": "PLUS"
  }
}
```

---

## 🔒 ENDPOINTS PROTEGIDOS
*(Requieren token JWT)*

**Para TODOS los endpoints protegidos, agregar en Headers:**
```
Authorization: Bearer {{token}}
```

---

## 👤 ENDPOINTS DE USUARIOS

### 3. ⬆️ Upgrade a Premium
```http
PATCH {{baseURL}}/users/upgrade-premium
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Body:** *(Vacío)*

**Respuesta esperada:** `200 OK`

**Ejemplo de Response:**
```json
{
  "message": "Usuario actualizado a PREMIUM exitosamente",
  "user": {
    "id": "64f123abc456def789012345",
    "profile": "PREMIUM"
  }
}
```

---

## 🏋️ ENDPOINTS DE RUTINAS

### 4. 📋 Obtener Categorías
```http
GET {{baseURL}}/routines/categories
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Respuesta esperada:** `200 OK`

**Ejemplo de Response:**
```json
{
  "categories": ["Fuerza", "Cardio", "Flexibilidad", "Funcional", "HIIT"]
}
```

---

### 5. 🔢 Contar Rutinas de Usuario
```http
GET {{baseURL}}/routines/count/{{userId}}
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Respuesta esperada:** `200 OK`

**Ejemplo de Response:**
```json
{
  "userId": "64f123abc456def789012345",
  "routineCount": 5
}
```

---

### 6. ➕ Crear Nueva Rutina
```http
POST {{baseURL}}/routines
```

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Rutina de Pecho",
  "description": "Rutina para trabajar músculos pectorales",
  "category": "Fuerza",
  "difficulty": "Intermedio",
  "duration": 60,
  "exercises": [
    {
      "name": "Press de banca",
      "sets": 4,
      "reps": 10,
      "weight": 80,
      "restTime": 90
    },
    {
      "name": "Flexiones de pecho",
      "sets": 3,
      "reps": 15,
      "weight": 0,
      "restTime": 60
    }
  ]
}
```

**⚠️ Script Post-Response (para guardar routineId):**
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.environment.set("routineId", response.routine.id);
    console.log("Routine ID guardado:", response.routine.id);
}
```

**Respuesta esperada:** `201 Created`

---

### 7. 📋 Obtener Rutinas del Usuario
```http
GET {{baseURL}}/routines
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Query Parameters (opcionales):**
- `category`: Filtrar por categoría
- `difficulty`: Filtrar por dificultad

**Respuesta esperada:** `200 OK`

---

### 8. 🔍 Obtener Rutina por ID
```http
GET {{baseURL}}/routines/{{routineId}}
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Respuesta esperada:** `200 OK`

---

### 9. ✏️ Actualizar Rutina
```http
PUT {{baseURL}}/routines/{{routineId}}
```

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Rutina de Pecho Modificada",
  "description": "Rutina actualizada para pectorales",
  "category": "Fuerza",
  "difficulty": "Avanzado",
  "duration": 75,
  "exercises": [
    {
      "name": "Press de banca",
      "sets": 5,
      "reps": 8,
      "weight": 90,
      "restTime": 120
    },
    {
      "name": "Press inclinado",
      "sets": 4,
      "reps": 10,
      "weight": 70,
      "restTime": 90
    }
  ]
}
```

**Respuesta esperada:** `200 OK`

---

### 10. 🗑️ Eliminar Rutina
```http
DELETE {{baseURL}}/routines/{{routineId}}
```

**Headers:**
```
Authorization: Bearer {{token}}
```

**Respuesta esperada:** `200 OK`

---

## 🧪 FLUJO DE TESTING RECOMENDADO

### 🔄 **Secuencia de Pruebas Básica:**

1. **Registro** → Crear un nuevo usuario
2. **Login** → Obtener token de autenticación
3. **Obtener categorías** → Verificar endpoint público autenticado
4. **Crear rutinas** → Probar creación (máximo 10 para PLUS)
5. **Listar rutinas** → Verificar que aparecen las creadas
6. **Obtener rutina específica** → Por ID
7. **Actualizar rutina** → Modificar una existente
8. **Upgrade a Premium** → Cambiar perfil de usuario
9. **Crear más rutinas** → Verificar que ya no hay límite de 10
10. **Eliminar rutina** → Borrar una rutina específica

---

## ✅ CASOS DE ÉXITO A PROBAR

### Autenticación:
- ✅ Registro con datos válidos
- ✅ Login con credenciales correctas
- ✅ Acceso a endpoints protegidos con token válido

### Rutinas:
- ✅ Creación de rutinas (respetando límites PLUS)
- ✅ Listado de rutinas propias
- ✅ Obtención de rutina específica
- ✅ Actualización de rutinas propias
- ✅ Eliminación de rutinas propias
- ✅ Conteo correcto de rutinas

### Perfiles:
- ✅ Upgrade de PLUS a PREMIUM
- ✅ Creación ilimitada de rutinas como PREMIUM

---

## ❌ CASOS DE ERROR A PROBAR

### Autenticación:
- ❌ Registro con email ya existente
- ❌ Login con credenciales incorrectas
- ❌ Acceso a endpoints protegidos sin token
- ❌ Acceso con token expirado/inválido

### Validación de Datos:
- ❌ Campos obligatorios vacíos
- ❌ Formatos de email inválidos
- ❌ Contraseñas muy cortas
- ❌ Datos de rutina incompletos

### Autorización:
- ❌ Intentar ver/modificar rutinas de otro usuario
- ❌ Crear más de 10 rutinas siendo usuario PLUS
- ❌ Acceder a rutina con ID inexistente

### Códigos de Error Esperados:
- `400 Bad Request` - Datos inválidos
- `401 Unauthorized` - Sin token o token inválido
- `403 Forbidden` - Sin permisos (ej: límite de rutinas)
- `404 Not Found` - Recurso no encontrado
- `409 Conflict` - Email ya existe

---

## 🛠️ CONFIGURACIÓN AVANZADA DE POSTMAN

### Variables de Entorno Completas:
```
baseURL: http://localhost:3000/api/v1
token: (actualización automática)
userId: (del login response)
routineId: (de crear rutina response)
testEmail: test@ejemplo.com
testPassword: 123456
```

### Scripts de Test Automático:

**Para Login:**
```javascript
pm.test("Login exitoso", function () {
    pm.response.to.have.status(200);
    const response = pm.response.json();
    pm.expect(response).to.have.property('token');
    pm.environment.set("token", response.token);
    pm.environment.set("userId", response.user.id);
});
```

**Para Crear Rutina:**
```javascript
pm.test("Rutina creada exitosamente", function () {
    pm.response.to.have.status(201);
    const response = pm.response.json();
    pm.expect(response.routine).to.have.property('id');
    pm.environment.set("routineId", response.routine.id);
});
```

**Para Verificar Límite PLUS:**
```javascript
pm.test("Límite de rutinas PLUS respetado", function () {
    if (pm.response.code === 403) {
        const response = pm.response.json();
        pm.expect(response.message).to.include("límite");
    } else {
        pm.response.to.have.status(201);
    }
});
```

---

## 💡 TIPS Y MEJORES PRÁCTICAS

### 🔄 Automatización:
1. **Usar Collection Runner** para ejecutar toda la suite de tests
2. **Configurar Pre-request Scripts** para setup automático
3. **Implementar Tests Scripts** para validaciones automáticas

### 📊 Organización:
1. **Agrupar requests por funcionalidad** (Auth, Users, Routines)
2. **Usar nombres descriptivos** para cada request
3. **Documentar cada endpoint** en las descripciones

### 🔍 Debugging:
1. **Usar Console.log** en scripts para debugging
2. **Verificar variables de entorno** regularmente
3. **Comprobar Headers** en cada request

### 🛡️ Seguridad:
1. **No hardcodear credenciales** en los requests
2. **Usar variables de entorno** para datos sensibles
3. **Verificar que tokens expiren** correctamente

---

## 🚀 COMANDOS ÚTILES PARA TESTING

### Iniciar el servidor:
```bash
cd "c:\Users\adria\OneDrive\Desktop\Semestre 4\Desarrollo Full Stack\Obligatorio-310665-336194\Obligatorio"
npm start
```

### Verificar que el servidor esté corriendo:
```bash
curl http://localhost:3000/api/v1/signup
```

---

## 📞 CONTACTO Y SOPORTE

Si encuentras algún problema durante las pruebas:
1. Verificar que el servidor esté corriendo en puerto 3000
2. Comprobar la conexión a MongoDB Atlas
3. Revisar que las variables de entorno estén configuradas
4. Verificar que el token JWT no haya expirado (1 hora de duración)

---

**¡Feliz Testing! 🎉**