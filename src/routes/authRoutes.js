const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// ruta para iniciar sesión
router.post('/login', loginUser);

module.exports = router;
