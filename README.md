
# 🎬 Backend API - Gestión de Películas y Usuarios

Este es un proyecto backend construido con **Node.js**, **Express** y **Sequelize** que permite la gestión de usuarios, autenticación JWT, películas, categorías y vistas de películas. Es ideal como base para una aplicación de streaming o catálogo de contenido.

---

## 🚀 Características Principales

- Registro e inicio de sesión con autenticación JWT
- CRUD completo para usuarios, películas y categorías
- Control de películas vistas por usuario (relación many-to-many)
- Validación de entradas con `express-validator`
- Middlewares de autenticación y validación
- Soporte para filtros, paginación y ordenamiento en consultas de películas

---

## 📁 Estructura del Proyecto

```
.
├── app.js
├── config
│   └── config.js
├── controllers
├── middlewares
├── models
├── routes
├── tests
├── validators
└── .env
```

---

## 🛠️ Instalación

```bash
mkdir backend-kubo
git clone https://github.com/jair-andres/prueba_kubo.git
cd backend-kubo
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz con el siguiente formato:

```
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=127.0.0.1
DB_PORT=5432

JWT_SECRET=your_jwt_secret
```

---

## ▶️ Ejecución del servidor

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000` o el puerto definido en tus variables de entorno.

---

## 📡 Rutas de la API

### 🔐 Autenticación (`/api/auth`)

| Método | Ruta            | Descripción                |
|--------|------------------|----------------------------|
| POST   | `/register`      | Registra un nuevo usuario  |
| POST   | `/login`         | Inicia sesión y devuelve token JWT |

---

### 👤 Usuarios (`/api/users`) 

> Protegido con token JWT 

| Método | Ruta         | Descripción                  |
|--------|--------------|------------------------------|
| POST   | `/`          | Crea un nuevo usuario        |
| GET    | `/`          | Lista todos los usuarios     |
| GET    | `/:id`       | Muestra un usuario por ID    |
| PUT    | `/:id`       | Actualiza un usuario         |
| DELETE | `/:id`       | Elimina un usuario           |

---

### 📁 Categorías (`/api/categories`)

> Protegido con token JWT

| Método | Ruta         | Descripción                     |
|--------|--------------|----------------------------------|
| POST   | `/`          | Crea una nueva categoría         |
| GET    | `/`          | Lista todas las categorías       |
| GET    | `/:id`       | Muestra una categoría por ID     |
| PUT    | `/:id`       | Actualiza una categoría          |
| DELETE | `/:id`       | Elimina una categoría            |

---

### 🎬 Películas (`/api/movies`)

> Protegido con token JWT

| Método | Ruta                     | Descripción                                          |
|--------|--------------------------|------------------------------------------------------|
| POST   | `/`                      | Crea una película                                    |
| GET    | `/`                      | Lista películas (filtros: título, categoría, paginación) |
| GET    | `/new_releases`         | Películas de los últimos 21 días                     |
| GET    | `/:id`                   | Muestra una película por ID                          |
| PUT    | `/:id`                   | Actualiza una película                               |
| DELETE | `/:id`                   | Elimina una película                                 |

---

## ✅ Tests

```bash
npm test
```

Incluye pruebas unitarias y de integración para autenticación, usuarios, películas, categorías y vistas.

---

## 📦 Scripts disponibles

```bash
npm run dev     # Corre el servidor con nodemon
npm test        # Ejecuta los tests con jest y supertest
```

---

## 📌 Notas

- Asegúrate de tener PostgreSQL corriendo en tu entorno local.
- Recuerda configurar correctamente el archivo `.env`.
- Las rutas protegidas requieren enviar el token JWT en el header:  
  `Authorization: Bearer <token>`

---

## 📬 Contacto

Si tienes dudas o sugerencias, no dudes en enviar un correo electronico jairbarreto23@gmail.com o el telefono +57 3024416893

---

**¡Gracias! 🎥**

CUESTIONARIO
¿Cuál es el propósito de "module.exports"?
RTA: Sirve para definir un modulo, encapsular y referenciar funciones para usarlas en distintas interfaces y lugares del proyecto. 
¿Qué es un middleware?
RTA: Es una funcioalidad la cual intercepta las peticiones https o funcionalidades normalmente lo uso para validar tokens, funciones o validaciones antes de acceder a un modulo o ruta.
¿Cual es la diferencia entre código bloqueante y código no bloqueante?
RTA: El codigo bloqueante es el que se ejecuta linealmente hasta que se termine el proceso, el codigo no bloqueante permite ejecutar varias funciones a la vez o en un orden determinado ejemplo como las funciones asincronicas y las promesas, etc.
¿Qué biblioteca de javascript usaría para manejar datos en tiempo real?
RTA: Usaria Socket.IO para manejar los datos en tiempo real con websockets 
¿Cual es la principal ventaja de trabajar un proyecto dockerizado?
RTA: Tienes muchas herramientas para realizar un deploy seguro y eficientemente con diferentes tecnologias y versiones
¿Cual es la diferencia entre una imagen y un volumen en Docker?
RTA: imagen normalmente se usa para desplegar software, backend o fronted leguajes de progrmación de logíca y los volumenes para el manejos de informacion y desplegar bases de datos
¿Con qué herramienta se puede orquestar un proyecto con múltiples imágenes en docker?
RTA: La creacion del archivo docker-compose.yml en el cual tenemos todas las imagenes de un proyecto, creando el entorno de un proyecto.
¿Cual es la principal ventaja de trabajar con cluster de kubernetes?
RTA: En este momento no tengo experiencia manejando cluster de kubernetes
