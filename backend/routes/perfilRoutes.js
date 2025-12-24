const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilControllers');
const auth = require('../middleware/auth');

router.get('/', perfilController.obtenerPerfiles);
router.post('/', auth, perfilController.crearPerfil); // Protegida
router.put('/:id', auth, perfilController.actualizarPerfil); // Protegida
router.delete('/:id', auth, perfilController.eliminarPerfil); // Protegida

module.exports = router;