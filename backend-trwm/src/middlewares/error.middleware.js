/**
 * Middleware global para gestionar errores de toda la aplicación.
 * 
 * Este middleware se ejecuta cuando algún controlador, ruta o middleware
 * envía un error mediante next(error).
 */
const errorMiddleware = (err, req, res, next) => {
    // Mostramos el error en consola para depuración durante el desarrollo
    console.error(err);

    // Código HTTP del error. Si no existe, usamos 500
    const statusCode = err.status || 500;

    // Mensaje del error. Si no existe, usamos uno genérico
    const message = err.message || 'Error interno del servidor';

    // Respuesta JSON uniforme para todos los errores
    res.status(statusCode).json({
        status: statusCode,
        message: message
    });
};

module.exports = errorMiddleware;