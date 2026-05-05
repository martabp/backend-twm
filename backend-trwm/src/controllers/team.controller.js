const Team = require('../models/team');
const Player = require('../models/player');

/**
 * Crear un equipo.
 */
const createTeam = async (req, res, next) => {
    try {
        const team = new Team(req.body);
        const savedTeam = await team.save();

        res.status(201).json({
            mensaje: 'Equipo creado correctamente',
            data: savedTeam
        });
    } catch (error) {
        error.status = 400;
        error.message = 'Error al crear equipo 400 bad request: ' + error.message;
        next(error);
    }
};

/**
 * Obtener todos los equipos.
 */
const getTeams = async (req, res, next) => {
    try {
        const teams = await Team.find();

        res.status(200).json({
            mensaje: 'Equipos obtenidos correctamente',
            data: teams
        });
    } catch (error) {
        error.status = 500;
        error.message = 'Error al obtener equipos 500 internal server error: ' + error.message;
        next(error);
    }
};

/**
 * Obtener equipo por ID.
 */
const getTeamById = async (req, res, next) => {
    try {
        const team = await Team.findById(req.params.id);

        if (!team) {
            const error = new Error('Equipo no encontrado 404 not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            mensaje: 'Equipo obtenido correctamente',
            data: team
        });
    } catch (error) {
        error.status = 400;
        error.message = 'ID no válido 400 bad request: ' + error.message;
        next(error);
    }
};

/**
 * Actualizar equipo por ID.
 */
const updateTeam = async (req, res, next) => {
    try {
        const team = await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!team) {
            const error = new Error('Equipo no encontrado 404 not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            mensaje: 'Equipo actualizado correctamente',
            data: team
        });
    } catch (error) {
        error.status = 400;
        error.message = 'Error al actualizar equipo 400 bad request: ' + error.message;
        next(error);
    }
};

/**
 * Eliminar equipo por ID.
 */
const deleteTeam = async (req, res, next) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);

        if (!team) {
            const error = new Error('Equipo no encontrado 404 not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            mensaje: 'Equipo eliminado correctamente'
        });
    } catch (error) {
        error.status = 400;
        error.message = 'ID no válido 400 bad request: ' + error.message;
        next(error);
    }
};

/**
 * Obtener jugadores de un equipo
 */
const getPlayersByTeam = async (req, res, next) => {
    try {
        const teamId = req.params.id;

        const players = await Player.find({ team: teamId }).populate('team');

        res.status(200).json({
            mensaje: 'Jugadores del equipo obtenidos correctamente',
            data: players
        });

    } catch (error) {
        error.status = 500;
        error.message = 'Error al obtener jugadores del equipo: ' + error.message;
        next(error);
    }
};

module.exports = {
    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    getPlayersByTeam
};