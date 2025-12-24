const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Lógica para registrar un nuevo usuario (lo usas una vez para crearte tu acceso)
exports.registrar = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'El usuario ya existe' });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: 'Usuario creado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar' });
    }
};

// Lógica para el Login (genera el token para el Frontend)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

        // Crear Token JWT
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};