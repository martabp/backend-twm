// Middleware para controlar roles
const checkRole = (role) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    mensaje: 'Usuario no autenticado'
                });
            }

            if (req.user.rol !== role) {
                return res.status(403).json({
                    mensaje: 'Acceso denegado: permisos insuficientes'
                });
            }

            next();

        } catch (error) {
            return res.status(500).json({
                mensaje: 'Error en control de roles'
            });
        }
    };
};

module.exports = checkRole;