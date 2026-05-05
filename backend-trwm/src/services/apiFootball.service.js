const axios = require('axios');

const getPlayersFromAPI = async () => {
    try {
        const response = await axios.get('https://v3.football.api-sports.io/players', {
            headers: {
                'x-apisports-key': process.env.API_FOOTBALL_KEY
            },
            params: {
                league: 39, // Premier League
                season: 2023
            }
        });

        return response.data;

    } catch (error) {
        throw new Error('Error al conectar con API-FOOTBALL');
    }
};

// Buscar jugador en API-FOOTBALL por ID
const getPlayerByExternalId = async (playerId) => {
    try {
        const response = await axios.get('https://v3.football.api-sports.io/players', {
            headers: {
                'x-apisports-key': process.env.API_FOOTBALL_KEY
            },
            params: {
                id: playerId,
                season: 2023
            }
        });

        return response.data.response[0];

    } catch (error) {
        throw new Error('Error al obtener jugador desde API-FOOTBALL');
    }
};

module.exports = {
    getPlayersFromAPI,
    getPlayerByExternalId
};