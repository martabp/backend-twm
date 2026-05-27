const Comentario =
require("../models/comentario");

/*
 * Obtener comentarios
 * de un jugador.
 */
exports.getComentariosByJugador =
async (req, res, next) => {

    try {
        console.log(req.query);

console.log(req.params);
        const comentarios =
    await Comentario.find({

        jugadorId:
            req.query.jugadorId

    }).sort({

        fechaAlta: -1

    });

        res.json(comentarios);

    } catch (error) {

        next(error);

    }

};

/*
 * Crear comentario
 */
exports.createComentario =
async (req, res, next) => {

    try {

        const nuevoComentario =
            new Comentario({

                jugadorId:
                    req.body.jugadorId,

                autor:
                    req.body.autor,

                contenido:
                    req.body.contenido,

                valoracion:
                    req.body.valoracion,

                geolocalizacion: {

                    latitude:
                        req.body
                           .geolocalizacion
                           ?.latitud,

                    longitude:
                        req.body
                           .geolocalizacion
                           ?.longitud

                }

            });

        const comentarioGuardado =
            await nuevoComentario.save();

        res.status(201)
           .json(comentarioGuardado);

    } catch (error) {

        next(error);

    }

};

/*
 * Eliminar comentario
 */
exports.deleteComentario =
async (req, res, next) => {

    try {

        await Comentario
            .findByIdAndDelete(
                req.params.id
            );

        res.json({

            message:
                "Comentario eliminado"

        });

    } catch (error) {

        next(error);

    }

};