const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentario.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const checkRole = require("../middlewares/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Gestión de comentarios
 */

/**
 * ==========================================
 * OBTENER COMENTARIOS
 * ==========================================
 */

/**
 * @swagger
 * /api/comentarios/jugador:
 *   get:
 *     summary: Obtener comentarios de un jugador
 *     tags: [Comentarios]
 *     parameters:
 *       - in: query
 *         name: jugadorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID MongoDB del jugador
 *     responses:
 *       200:
 *         description: Comentarios obtenidos correctamente
 *       400:
 *         description: ID del jugador no válido
 *       404:
 *         description: Jugador no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/jugador",comentarioController.getComentariosByJugador);

/**
 * ==========================================
 * CREAR COMENTARIO
 * ==========================================
 */

/**
 * @swagger
 * /api/comentarios:
 *   post:
 *     summary: Crear un comentario
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jugadorId
 *               - autor
 *               - texto
 *             properties:
 *               jugadorId:
 *                 type: string
 *                 example: "665c2f4d91c123456789abcd"
 *               autor:
 *                 type: string
 *                 example: "Marta"
 *               texto:
 *                 type: string
 *                 example: "Gran jugador esta temporada"
 *               puntuacion:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Comentario creado correctamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Token no proporcionado o no válido
 *       500:
 *         description: Error interno del servidor
 */
router.post("/",authMiddleware,comentarioController.createComentario);

/**
 * ==========================================
 * ELIMINAR COMENTARIO
 * ==========================================
 */

/**
 * @swagger
 * /api/comentarios/{id}:
 *   delete:
 *     summary: Eliminar comentario
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID MongoDB del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado correctamente
 *       401:
 *         description: Token no proporcionado o no válido
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete( "/:id",authMiddleware,checkRole('ADMIN'), comentarioController.deleteComentario);

module.exports = router;