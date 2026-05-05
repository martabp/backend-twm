const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
const playerController = require('../controllers/player.controller');

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Gestión de jugadores
 */

/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: Obtener todos los jugadores
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jugadores obtenidos correctamente
 *       401:
 *         description: Token no proporcionado o no válido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authMiddleware, playerController.getPlayers);

/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Crear un jugador
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - equipo
 *               - liga
 *               - origen
 *               - geolocalizacion
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Messi"
 *               equipo:
 *                 type: string
 *                 example: "Inter Miami"
 *               liga:
 *                 type: string
 *                 example: "MLS"
 *               nacionalidad:
 *                 type: string
 *                 example: "Argentina"
 *               edad:
 *                 type: number
 *                 example: 36
 *               posicion:
 *                 type: string
 *                 example: "Attacker"
 *               imagen:
 *                 type: string
 *                 example: "https://foto.com/messi.jpg"
 *               origen:
 *                 type: string
 *                 example: "MANUAL"
 *               geolocalizacion:
 *                 type: object
 *                 properties:
 *                   latitud:
 *                     type: number
 *                     example: 40.4168
 *                   longitud:
 *                     type: number
 *                     example: -3.7038
 *     responses:
 *       201:
 *         description: Jugador creado correctamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Token no proporcionado o no válido
 */
router.post('/', authMiddleware, playerController.createPlayer);

/**
 * @swagger
 * /api/players/external:
 *   get:
 *     summary: Obtener jugadores desde API externa
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Datos obtenidos de API externa
 *       500:
 *         description: Error al obtener datos de API externa
 */
router.get('/external', playerController.getExternalPlayers);

/**
 * @swagger
 * /api/players/import/{playerId}:
 *   post:
 *     summary: Importar jugador desde API externa usando su ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID externo del jugador en la API Football
 *     responses:
 *       201:
 *         description: Jugador importado correctamente
 *       400:
 *         description: El jugador ya existe en la base de datos
 *       404:
 *         description: Jugador no encontrado en API externa
 *       500:
 *         description: Error al importar jugador desde API externa
 */
router.post('/import/:playerId', playerController.importPlayerByExternalId);

/**
 * @swagger
 * /api/players/{id}:
 *   get:
 *     summary: Obtener jugador por ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB del jugador
 *     responses:
 *       200:
 *         description: Jugador obtenido correctamente
 *       400:
 *         description: ID no válido
 *       401:
 *         description: Token no proporcionado o no válido
 *       404:
 *         description: Jugador no encontrado
 */
router.get('/:id', authMiddleware, playerController.getPlayerById);

/**
 * @swagger
 * /api/players/{id}:
 *   put:
 *     summary: Actualizar jugador
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB del jugador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Messi actualizado"
 *               equipo:
 *                 type: string
 *                 example: "Inter Miami"
 *               liga:
 *                 type: string
 *                 example: "MLS"
 *               edad:
 *                 type: number
 *                 example: 37
 *               posicion:
 *                 type: string
 *                 example: "Attacker"
 *     responses:
 *       200:
 *         description: Jugador actualizado correctamente
 *       400:
 *         description: Error al actualizar jugador
 *       401:
 *         description: Token no proporcionado o no válido
 *       403:
 *         description: No tienes permisos para realizar esta acción
 *       404:
 *         description: Jugador no encontrado
 */
router.put('/:id', authMiddleware, checkRole('ADMIN'), playerController.updatePlayer);

/**
 * @swagger
 * /api/players/{id}:
 *   delete:
 *     summary: Eliminar jugador
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB del jugador
 *     responses:
 *       200:
 *         description: Jugador eliminado correctamente
 *       400:
 *         description: ID no válido
 *       401:
 *         description: Token no proporcionado o no válido
 *       403:
 *         description: No tienes permisos para realizar esta acción
 *       404:
 *         description: Jugador no encontrado
 */
router.delete('/:id', authMiddleware, checkRole('ADMIN'), playerController.deletePlayer);

module.exports = router;