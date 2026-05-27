require('dotenv').config();
const cors = require('cors');

const express = require('express');
const connectDB = require('./config/db');
const playerRoutes = require('./routes/player.routes');
const authRoutes = require('./routes/auth.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const teamRoutes = require('./routes/team.routes');
const comentarioRoutes = require("./routes/comentario.routes");

// Importamos el middleware global de errores
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(cors());

// Conectar a la base de datos
connectDB();

// Middleware para permitir recibir JSON en las peticiones
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API TRWM funcionando correctamente'
    });
});

// Rutas de autenticación JWT
app.use('/api/auth', authRoutes);

// Rutas de jugadores
app.use('/api/jugadores', playerRoutes);

// Ruta de equipos
app.use('/api/equipos', teamRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Middleware global de errores
app.use(errorMiddleware);

// Comentarios 
app.use( "/api/comentarios", comentarioRoutes );

// Puerto desde .env
const PORT = process.env.PORT || 3000;

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Middleware para rutas no encontradas
app.use((req, res, next) => {
    const error = new Error('Página no encontrada 404 not found');
    error.status = 404;
    next(error);
});