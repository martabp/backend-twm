const Player = require('../models/player');
const apiFootballService = require('../services/apiFootball.service');

/**
 * Crear jugador manualmente.
 */
const createPlayer = async (req, res, next) => {
    try {
        const player = new Player(req.body);
        const savedPlayer = await player.save();

        res.status(201).json({
            mensaje: 'Jugador creado correctamente',
            data: savedPlayer
        });

    } catch (error) {
        error.status = 400;
        error.message = 'Error al crear jugador 400 bad request: ' + error.message;
        next(error);
    }
};

/**
 * Obtener todos los jugadores.
 */
const getPlayers = async (req, res, next) => {
    try {
        const players = await Player.find().populate('team');

        res.status(200).json({
            mensaje: 'Jugadores obtenidos correctamente',
            data: players
        });

    } catch (error) {
        error.status = 500;
        error.message = 'Error al obtener jugadores 500 internal server error: ' + error.message;
        next(error);
    }
};

/**
 * Obtener jugador por ID.
 */
const getPlayerById = async (req, res, next) => {
    try {
       const player = await Player.findById(req.params.id).populate('team');

        if (!player) {
            const error = new Error('Jugador no encontrado 404 not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            mensaje: 'Jugador obtenido correctamente',
            data: player
        });

    } catch (error) {
        error.status = 400;
        error.message = 'ID no válido 400 bad request: ' + error.message;
        next(error);
    }
};

/**
 * Obtener jugadores desde API externa.
 */
const getExternalPlayers = async (req, res, next) => {
    try {
        const data = await apiFootballService.getPlayersFromAPI();

        res.status(200).json({
            mensaje: 'Datos obtenidos de API externa',
            data: data
        });

    } catch (error) {
        error.status = 500;
        error.message = 'Error al obtener datos de API externa 500 internal server error: ' + error.message;
        next(error);
    }
};

/**
 * Eliminar jugador por ID.
 */
const deletePlayer = async (req, res, next) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);

        if (!player) {
            const error = new Error('Jugador no encontrado 404 not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            mensaje: 'Jugador eliminado correctamente'
        });

    } catch (error) {
        error.status = 400;
        error.message = 'ID no válido 400 bad request: ' + error.message;
        next(error);
    }
};

/**
 * Actualizar jugador por ID.
 */
const updatePlayer = async (req, res, next) => {
    try {
        const player = await Player.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!player) {
            const error = new Error('Jugador no encontrado 404 not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            mensaje: 'Jugador actualizado correctamente',
            data: player
        });

    } catch (error) {
        error.status = 400;
        error.message = 'Error al actualizar jugador 400 bad request: ' + error.message;
        next(error);
    }
};

/**
 * Importar jugador desde API externa usando datos enviados en el body.
 */
const importPlayer = async (req, res, next) => {
    try {
        const playerData = req.body;

        const newPlayer = new Player({
            nombre: playerData.player.name,
            equipo: playerData.statistics[0].team.name,
            liga: playerData.statistics[0].league.name,
            nacionalidad: playerData.player.nationality,
            edad: playerData.player.age,
            posicion: playerData.statistics[0].games.position,
            imagen: playerData.player.photo,
            origen: 'API_FOOTBALL',
            geolocalizacion: {
                latitud: 0,
                longitud: 0
            },
            comentarios: []
        });

        const savedPlayer = await newPlayer.save();

        res.status(201).json({
            mensaje: 'Jugador importado correctamente desde API externa',
            data: savedPlayer
        });

    } catch (error) {
        error.status = 500;
        error.message = 'Error al importar jugador desde API externa 500 internal server error: ' + error.message;
        next(error);
    }
};

/**
 * Importar jugador desde API externa usando su ID externo.
 */
const importPlayerByExternalId = async (req, res, next) => {
    try {
        const { playerId } = req.params;

        const playerData = await apiFootballService.getPlayerByExternalId(playerId);

        if (!playerData) {
            const error = new Error('Jugador no encontrado en API externa 404 not found');
            error.status = 404;
            return next(error);
        }

        const existingPlayer = await Player.findOne({
            nombre: playerData.player.name,
            equipo: playerData.statistics[0].team.name
        });

        if (existingPlayer) {
            const error = new Error('El jugador ya existe en la base de datos 400 bad request');
            error.status = 400;
            return next(error);
        }

        const newPlayer = new Player({
            nombre: playerData.player.name,
            equipo: playerData.statistics[0].team.name,
            liga: playerData.statistics[0].league.name,
            nacionalidad: playerData.player.nationality,
            edad: playerData.player.age,
            posicion: playerData.statistics[0].games.position,
            imagen: playerData.player.photo,
            origen: 'API_FOOTBALL',
            geolocalizacion: {
                latitud: 0,
                longitud: 0
            },
            comentarios: []
        });

        const savedPlayer = await newPlayer.save();

        res.status(201).json({
            mensaje: 'Jugador importado correctamente desde API externa',
            data: savedPlayer
        });

    } catch (error) {
        error.status = 500;
        error.message = 'Error al importar jugador desde API externa 500 internal server error: ' + error.message;
        next(error);
    }
};

module.exports = {
    createPlayer,
    getPlayers,
    getPlayerById,
    deletePlayer,
    updatePlayer,
    getExternalPlayers,
    importPlayer,
    importPlayerByExternalId
};