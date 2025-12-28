# 🚀 Talent Hub – Tech Profiles Platform

Plataforma web para la gestión y visualización de **perfiles tecnológicos**, con autenticación por roles, filtros avanzados y panel de administración.

👉 **Demo online:**  
🔗 https://talent-hub-m4t8.onrender.com/

---

## 🧠 Descripción

**Talent Hub** permite explorar perfiles IT filtrando por **categoría**, **nivel de seniority** y **búsqueda por texto**.  
Cuenta con un sistema de autenticación que distingue entre usuarios **admin** y **user**, habilitando acciones según el rol.

Es un proyecto full-stack pensado como **portfolio profesional**, aplicando buenas prácticas reales de desarrollo y despliegue.

---

## ✨ Funcionalidades

### 👤 Usuarios (sin login)
- Ver perfiles tecnológicos
- Buscar por nombre o título
- Filtrar por categoría y seniority
- Modo oscuro / claro

### 🔐 Usuarios autenticados
- Login con email y contraseña
- Control de permisos por rol

### 🛠️ Administrador
- Crear nuevos perfiles
- Editar perfiles existentes
- Eliminar perfiles
- Acceso completo al CRUD

---

## 🧩 Tecnologías utilizadas

### Frontend
- HTML5
- CSS (Tailwind)
- JavaScript (ES Modules)
- SPA (Single Page Application)
- Fetch API

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (autenticación)
- CORS configurado
- Arquitectura REST API

### Deploy
- **Render** (backend + frontend unificado)
- MongoDB Atlas

---

## 🗂️ Estructura del proyecto

```txt
backend/
 ├── src/
 │   ├── routes/
 │   ├── controllers/
 │   ├── models/
 │   └── server.js
frontend/
 ├── index.html
 ├── js/
 │   ├── api.js
 │   ├── main.js
 │   ├── crud.js
 │   ├── filtros.js
 │   └── ui.js
 └── styles.css
```

---

## 🔐 Roles disponibles

| Rol   | Permisos |
|------|----------|
| user | Solo lectura |
| admin | Crear, editar y eliminar perfiles |

---

## 📌 Estado del proyecto

✔ Deploy completo  
✔ Frontend + Backend integrados  
✔ Control de roles  
✔ Proyecto estable y funcional  

---

## 👩‍💻 Autora
* **MARTINEZ HERRERO, Maria Gabriela**
* Data Analyst | Frontend & Backend Developer 
<p>
  <a href="https://github.com/magamahe" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="32"/>
  </a>
  &nbsp;
  <a href="https://linkedin.com/in/magamahe" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="32"/>
  </a>
  &nbsp;
  <a href="mailto:magamahe@gmail.com">
    <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="32"/>
  </a>
</p>
 
---

⭐ Si te gusta el proyecto, ¡no olvides dejar una estrella!
