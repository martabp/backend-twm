const axios = require('axios');

/**
 * Obtener jugadores desde API-FOOTBALL.
 * Permite filtrar por liga y temporada.
 */
const getPlayersFromAPI = async (
    league,
    season
) => {

    try {

        const response = await axios.get(
            'https://v3.football.api-sports.io/players',

            {
                headers: {
                    'x-apisports-key':
                        process.env.API_FOOTBALL_KEY
                },

                params: {
                    league,
                    season
                }
            }
        );

        return response.data;

    } catch (error) {

        throw new Error(
            'Error al conectar con API-FOOTBALL'
        );
    }
};

/**
 * Buscar jugadores por nombre
 * usando filtros dinámicos.
 */
const searchPlayersByName = async (
    name,
    season,
    league
) => {

    try {

        const response = await axios.get(
            'https://v3.football.api-sports.io/players',

            {
                headers: {
                    'x-apisports-key':
                        process.env.API_FOOTBALL_KEY
                },

                params: {
                    search: name,
                    season,
                    league
                }
            }
        );

        return response.data.response;

    } catch (error) {

        throw new Error(
            'Error al buscar jugadores en API-FOOTBALL'
        );
    }
};

/**
 * Obtener jugador por ID externo.
 */
const getPlayerByExternalId = async (
    playerId,
    season
) => {

    try {

        const response = await axios.get(
            'https://v3.football.api-sports.io/players',

            {
                headers: {
                    'x-apisports-key':
                        process.env.API_FOOTBALL_KEY
                },

                params: {
                    id: playerId,
                    season
                }
            }
        );

        return response.data.response[0];

    } catch (error) {

        throw new Error(
            'Error al obtener jugador desde API-FOOTBALL'
        );
    }
};

module.exports = {
    getPlayersFromAPI,
    getPlayerByExternalId,
    searchPlayersByName
};