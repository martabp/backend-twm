const swaggerJsdoc = require('swagger-jsdoc');

// Configuración principal de Swagger/OpenAPI
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Proyecto Final - Backend TRWM',
            version: '1.0.0',
            description: 'Marta Borrego Padilla'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            }
        ],

        // CONFIGURACIÓN DE SEGURIDAD JWT
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },

        // Aplica seguridad global (opcional pero recomendable)
        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ['./src/routes/*.js'] 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;