// src/routes/profiles.routes.js
import express from 'express';
import {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile
} from '../controllers/profiles.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// 📌 RUTA PÚBLICA: Obtener todos los perfiles
router.get('/', getProfiles);

// 📌 RUTA ADMIN: Crear un perfil (solo admins)
router.post('/', protect, isAdmin, createProfile);

// 📌 RUTA ADMIN: Actualizar un perfil por ID
router.put('/:id', protect, isAdmin, updateProfile);

// 📌 RUTA ADMIN: Eliminar un perfil por ID
router.delete('/:id', protect, isAdmin, deleteProfile);

export default router;
