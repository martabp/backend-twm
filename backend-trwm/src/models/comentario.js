const mongoose = require("mongoose");

/*
 * Modelo de comentarios
 * asociados a jugadores.
 */
const comentarioSchema = new mongoose.Schema({

    /*
     * ID del jugador
     */
    jugadorId: {
        type: String,
        required: true
    },

    /*
     * Autor del comentario
     */
    autor: {
        type: String,
        required: true
    },

    /*
     * Texto comentario
     */
    contenido: {
        type: String,
        required: true
    },

    /*
     * Valoración 1-5
     */
    valoracion: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    /*
     * Coordenadas GPS
     */
    geolocalizacion: {

        latitude: {
            type: Number
        },

        longitude: {
            type: Number
        }

    },

    /*
     * Fecha creación
     */
    fechaAlta: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.model(
        "Comentario",
        comentarioSchema
    );