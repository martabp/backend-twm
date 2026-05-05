const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Registro de usuario
const register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                mensaje: 'El usuario ya existe'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            nombre,
            email,
            password: hashedPassword,
            rol
        });

        const savedUser = await user.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            data: {
                id: savedUser._id,
                nombre: savedUser.nombre,
                email: savedUser.email,
                rol: savedUser.rol
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// Login de usuario
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                rol: user.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            mensaje: 'Login correcto',
            token
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

module.exports = {
    register,
    login
};