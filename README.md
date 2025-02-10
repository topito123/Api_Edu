# API de Gestión Educativa

Esta API está diseñada para gestionar información relacionada con un sistema educativo. Incluye funcionalidades para crear, actualizar y listar estudiantes, cursos y profesores, así como gestionar la información del usuario.

## Variables de Entorno

Instala las dependencias:
PORT=5000
MONGO_URI=mongodb://localhost:27017/edu-api
JWT_SECRET=your_jwt_secret

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/edu-api
JWT_SECRET=your_jwt_secret
```

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/edu-api.git
   cd edu-api
 2. instalar dependendencias:
    npm install
3. inicia el server
npm run dev

## Endpoints de la API

### Autenticación

    - **Iniciar Sesión**
    - **URL:** `/api/auth/login`
    - **URL:** `
    - **Método:** `POST`
    - **Cuerpo:**
        ```json
        {
            "email": "string",
            "password": "string"
        }
        

### Estudiantes

- **Registrar Estudiante**
    - **URL:** `/api/students/register`
    - **Método:** `POST`
    - **Cuerpo:**
        ```json
        {
            "name": "string",
            "email": "string",
            "password": "your_password"
        }
        ```
        **Inscribirse en un Curso**

**URL:** /api/students/enroll
**Método:** POST
**Encabezados:**
Authorization: Bearer <tu_token_jwt> <vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> </vscode_annotation> 
**Cuerpo**
        ```json

{
  "studentId": "studentId",
  "courseId": "courseId"
}
        ```

## Visualizar Cursos Asignados

URL: /api/students/:studentId/courses
Método: GET
Encabezados:
Authorization: Bearer <tu_token_jwt>

## Editar Perfil de Estudiante

URL: /api/students/:studentId
Método: PUT
Encabezados:
Authorization: Bearer <tu_token_jwt>

**cuerpo**
{
  "name": "Nuevo Nombre",
  "email": "nuevo.email@example.com"
}

**Eliminar Perfil de Estudiante**

URL: /api/students/:studentId
Método: DELETE
Encabezados:
Authorization: Bearer <tu_token_jwt>


### Maestros

- **Registrar Maestro**
 **URL:** /api/teachers/register
**Método:** POST
**Cuerpo:**
        ```json
        {
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "password": "password123"
        }
        ```



### Cursos

- **Crear Curso**
    - **URL:** `/api/courses`
    - **Método:** `POST`
    **Encabezado:** `Authorization: Bearer <tu_token_jwt>`
    - **Cuerpo:**
        ```json
        {
            "name": "string",
            "description": "string",
            "teacherId": "teacherId"
        }
        ```

- **Editar curso**
    - **URL:** `/api/courses/:id`
    - **Método:** `PUT`
    **Encabezado:**
    `Authorization: Bearer <tu_token_jwt>`
    **Cuerpo:**
    {
  "name": "Nuevo Nombre del Curso",
  "description": "Nueva Descripción del Curso"
}

## Eliminar Curso

URL: /api/courses/:id
Método: DELETE
Encabezados:
Authorization: Bearer <tu_token_jwt>
Visualizar Todos los Cursos

URL: /api/courses
Método: GET

## Asignar Estudiante a Curso

URL: /api/courses/:courseId/students/:studentId
Método: POST
Encabezados:
Authorization: Bearer <tu_token_jwt>

## Middleware

## Autenticación
authenticateUser Verifica el token JWT y establece req.user.

## Roles

isTeacher Verifica que el usuario tenga el rol TEACHER_ROLE.

isStudent Verifica que el usuario tenga el rol STUDENT_ROLE.


## Modelos

## Estudiante
Campos:
name: String, requerido
email: String, requerido, único
password: String, requerido
courses: Array de ObjectId, referencia a Course

## Maestro
Campos:
name: String, requerido
email: String, requerido, único
password: String, requerido
courses: Array de ObjectId, referencia a Course

## Curso
Campos:
name: String, requerido, único
description: String, requerido
teacher: ObjectId, referencia a Teacher, requerido
students: Array de ObjectId, referencia a Student
