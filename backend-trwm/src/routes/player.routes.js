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
 * ==========================================
 * RUTAS GENERALES
 * ==========================================
 */

/**
 * @swagger
 * /api/jugadores:
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
router.get('/',playerController.getPlayers); // abierto a cualquier usuario con o sin loguear

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
router.post('/',authMiddleware, playerController.createPlayer); // Crear usuario

/**
 * ==========================================
 * API EXTERNA
 * ==========================================
 */

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
router.get('/external',playerController.getExternalPlayers);

/**
 * @swagger
 * /api/players/external/search/{name}:
 *   get:
 *     summary: Buscar jugadores externos por nombre
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del jugador
 *       - in: query
 *         name: season
 *         schema:
 *           type: string
 *         example: 2023
 *       - in: query
 *         name: league
 *         schema:
 *           type: string
 *         example: 140
 *     responses:
 *       200:
 *         description: Jugadores encontrados correctamente
 *       500:
 *         description: Error al buscar jugadores externos
 */
router.get( '/external/search/:name', playerController.searchExternalPlayers);

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
 *         description: ID externo del jugador en API Football
 *       - in: query
 *         name: season
 *         schema:
 *           type: string
 *         example: 2023
 *     responses:
 *       201:
 *         description: Jugador importado correctamente
 *       400:
 *         description: El jugador ya existe
 *       404:
 *         description: Jugador no encontrado
 *       500:
 *         description: Error al importar jugador
 */
router.post( '/import/:playerId',authMiddleware,playerController.importPlayerByExternalId);

/**
 * ==========================================
 * RUTAS POR ID
 * SIEMPRE AL FINAL
 * ==========================================
 */

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
 *         description: ID MongoDB del jugador
 *     responses:
 *       200:
 *         description: Jugador obtenido correctamente
 *       400:
 *         description: ID no válido
 *       404:
 *         description: Jugador no encontrado
 */
router.get('/:id',authMiddleware,playerController.getPlayerById); 

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
 *         description: ID MongoDB del jugador
 *     responses:
 *       200:
 *         description: Jugador actualizado correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Jugador no encontrado
 */
router.put( '/:id',authMiddleware,checkRole('ADMIN'),playerController.updatePlayer);  

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
 *         description: ID MongoDB del jugador
 *     responses:
 *       200:
 *         description: Jugador eliminado correctamente
 *       404:
 *         description: Jugador no encontrado
 */
router.delete('/:id',authMiddleware,checkRole('ADMIN'),playerController.deletePlayer); 

module.exports = router;