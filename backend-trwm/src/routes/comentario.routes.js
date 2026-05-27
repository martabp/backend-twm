const express = require("express");

const router = express.Router();

const comentarioController =
require("../controllers/comentario.controller");

/*
 * Obtener comentarios
 * de un jugador
 */
router.get(
    "/jugador",
    comentarioController
        .getComentariosByJugador
);

/*
 * Crear comentario
 */
router.post(
    "/",
    comentarioController
        .createComentario
);

/*
 * Eliminar comentario
 */
router.delete(
    "/:id",
    comentarioController
        .deleteComentario
);

module.exports = router;