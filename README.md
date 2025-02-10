# API de Gestión Educativa

Esta API está diseñada para gestionar información relacionada con un sistema educativo. Incluye funcionalidades para crear, actualizar y listar estudiantes, cursos y profesores, así como gestionar la información del usuario.

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```

## Endpoints de la API

### Autenticación

- **Registrar Usuario**
    - **URL:** `/eduSystem/v1/auth/register`
    - **Método:** `POST`
    - **Cuerpo:**
        ```json
        {
            "name": "string",
            "surname": "string",
            "username": "string",
            "email": "string",
            "phone": "string",
            "password": "string",
            "role": "string",
            "profilePicture": "file"
        }
        ```

- **Iniciar Sesión**
    - **URL:** `/eduSystem/v1/auth/login`
    - **Método:** `POST`
    - **Cuerpo:**
        ```json
        {
            "email": "string",
            "password": "string"
        }
        ```

### Usuarios

- **Obtener Usuario por ID**
    - **URL:** `/eduSystem/v1/user/findUser/:uid`
    - **Método:** `GET`

- **Eliminar Usuario**
    - **URL:** `/eduSystem/v1/user/deleteUser/:uid`
    - **Método:** `DELETE`

- **Listar Usuarios**
    - **URL:** `/eduSystem/v1/user/`
    - **Método:** `GET`

- **Actualizar Contraseña del Usuario**
    - **URL:** `/eduSystem/v1/user/updatePassword/:uid`
    - **Método:** `PATCH`
    - **Cuerpo:**
        ```json
        {
            "newPassword": "string"
        }
        ```

- **Actualizar Información del Usuario**
    - **URL:** `/eduSystem/v1/user/updateUser/:uid`
    - **Método:** `PUT`
    - **Cuerpo:**
        ```json
        {
            "name": "string",
            "surname": "string"
        }
        ```

### Estudiantes

- **Registrar Estudiante**
    - **URL:** `/eduSystem/v1/student/addStudent`
    - **Método:** `POST`
    - **Cuerpo:**
        ```json
        {
            "name": "string",
            "surname": "string",
            "age": "number",
            "email": "string"
        }
        ```

- **Obtener Estudiante por ID**
    - **URL:** `/eduSystem/v1/student/findStudent/:sid`
    - **Método:** `GET`

- **Eliminar Estudiante**
    - **URL:** `/eduSystem/v1/student/deleteStudent/:sid`
    - **Método:** `DELETE`

- **Listar Estudiantes**
    - **URL:** `/eduSystem/v1/student/`
    - **Método:** `GET`

### Cursos

- **Registrar Curso**
    - **URL:** `/eduSystem/v1/course/addCourse`
    - **Método:** `POST`
    - **Cuerpo:**
        ```json
        {
            "name": "string",
            "description": "string",
            "duration": "number"
        }
        ```

- **Obtener Curso por ID**
    - **URL:** `/eduSystem/v1/course/findCourse/:cid`
    - **Método:** `GET`

- **Eliminar Curso**
    - **URL:** `/eduSystem/v1/course/deleteCourse/:cid`
    - **Método:** `DELETE`

- **Listar Cursos**
    - **URL:** `/eduSystem/v1/course/`
    - **Método:** `GET`

### Profesores

- **Registrar Profesor**
    - **URL:** `/eduSystem/v1/teacher/addTeacher`
    - **Método:** `POST`
    - **Cuerpo:**
        ```json
        {
            "name": "string",
            "surname": "string",
            "email": "string",
            "subject": "string"
        }
        ```

- **Obtener Profesor por ID**
    - **URL:** `/eduSystem/v1/teacher/findTeacher/:tid`
    - **Método:** `GET`

- **Eliminar Profesor**
    - **URL:** `/eduSystem/v1/teacher/deleteTeacher/:tid`
    - **Método:** `DELETE`

- **Listar Profesores**
    - **URL:** `/eduSystem/v1/teacher/`
    - **Método:** `GET`

