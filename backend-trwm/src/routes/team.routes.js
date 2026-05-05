const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
const teamController = require('../controllers/team.controller');

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Gestión de equipos
 */

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Obtener todos los equipos
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Equipos obtenidos correctamente
 *       401:
 *         description: Token no válido
 */
router.get('/', authMiddleware, teamController.getTeams);

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Crear un equipo
 *     tags: [Teams]
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
 *               - liga
 *               - pais
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "FC Barcelona"
 *               liga:
 *                 type: string
 *                 example: "La Liga"
 *               pais:
 *                 type: string
 *                 example: "España"
 *               estadio:
 *                 type: string
 *                 example: "Camp Nou"
 *               fundacion:
 *                 type: number
 *                 example: 1899
 *               escudo:
 *                 type: string
 *                 example: "https://escudo.com/barca.png"
 *     responses:
 *       201:
 *         description: Equipo creado correctamente
 *       400:
 *         description: Error de validación
 */
router.post('/', authMiddleware, checkRole('ADMIN'), teamController.createTeam);

/**
 * @swagger
 * /api/teams/{id}/players:
 *   get:
 *     summary: Obtener jugadores de un equipo
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jugadores del equipo obtenidos correctamente
 */
router.get('/:id/players', authMiddleware, teamController.getPlayersByTeam);

/**
 * @swagger
 * /api/teams/{id}:
 *   get:
 *     summary: Obtener equipo por ID
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Equipo obtenido correctamente
 *       404:
 *         description: Equipo no encontrado
 */
router.get('/:id', authMiddleware, teamController.getTeamById);

/**
 * @swagger
 * /api/teams/{id}:
 *   put:
 *     summary: Actualizar equipo
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Equipo actualizado correctamente
 */
router.put('/:id', authMiddleware, checkRole('ADMIN'), teamController.updateTeam);

/**
 * @swagger
 * /api/teams/{id}:
 *   delete:
 *     summary: Eliminar equipo
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Equipo eliminado correctamente
 */
router.delete('/:id', authMiddleware, checkRole('ADMIN'), teamController.deleteTeam);


module.exports = router;