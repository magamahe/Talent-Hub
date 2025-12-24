const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar un usuario (la usas tú para crearte tu cuenta)
router.post('/register', authController.registrar);

// Ruta para el login (la que usará el formulario de la web)
router.post('/login', authController.login);

module.exports = router;