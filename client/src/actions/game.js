import * as playerTypes from '../constants/playerTypes';
import { SOCKET } from '../constants/apiRequestTypes';

export const ADD_PLAYER   = 'ADD_PLAYER';
export const BEGIN_GAME   = 'BEGIN_GAME';
export const ROOM_CREATED = 'ROOM_CREATED';
export const END_GAME     = 'END_GAME';

export const PLAYER_CONNECTED = 'PLAYER_CONNECTED';

export const GAME_CREATING = 'GAME_CREATING';
export const GAME_CREATED  = 'GAME_CREATED';
export const GAME_FAILURE  = 'GAME_FAILURE';

export const GAMES_REFRESHING         = 'GAMES_REFRESHING';
export const GAMES_REFRESHED          = 'GAMES_REFRESHED';
export const GAMES_REFRESHING_FAILURE = 'GAMES_REFRESHING_FAILURE';

export const CONNECT_TO_GAME_PENDING = 'CONNECT_TO_GAME_PENDING';
export const CONNECT_TO_GAME_SUCCESS = 'CONNECT_TO_GAME_SUCCESS';
export const CONNECT_TO_GAME_FAILURE = 'CONNECT_TO_GAME_FAILURE';

//const
const generatePlayerId = players => {
    return players.length + 1;
};

const addPlayerToGame = (id, name, playerType) => ({
    type:       ADD_PLAYER,
    id:         id,
    name:       name,
    playerType: playerType,
});

const startGame = (playerLogin, playerName, maxPlayers) => ({
    type: SOCKET,
    stages: [GAME_CREATING, GAME_CREATED, GAME_FAILURE],
    promise: (socket) => {
        return socket.emit('startGame', {playerLogin, playerName, maxPlayers});
    },
});
export const startGameRequest = (playerLogin, playerName, maxPlayers) => dispatch => dispatch(startGame(playerLogin, playerName, maxPlayers));

const connectToGame = (roomId, playerLogin, playerName) => ({
    type: SOCKET,
    stages: [CONNECT_TO_GAME_PENDING, CONNECT_TO_GAME_SUCCESS, CONNECT_TO_GAME_FAILURE],
    promise: (socket) => {
        return socket.emit('connectToGame', {roomId, playerLogin, playerName});
    },
});
export const connectToGameRequest = (roomId, playerLogin, playerName) => dispatch => dispatch(connectToGame(roomId, playerLogin, playerName));

const findGames = () => ({
    type: SOCKET,
    stages: [GAMES_REFRESHING, GAMES_REFRESHED, GAMES_REFRESHING_FAILURE],
    promise: (socket) => {
        return socket.emit('findGames');
    },
});
export const findGamesRequest = () => dispatch => dispatch(findGames());

export const addHumanPlayer = () => (dispatch, getState) =>  {
    let id   = generatePlayerId(getState().game.players);
    let name = 'Player #' + id;

    dispatch(addPlayerToGame(id, name, playerTypes.PLAYER_HUMAN));
};

export const addBotPlayer = () => (dispatch, getState) =>  {
    let id   = generatePlayerId(getState().game.players);
    let name = 'Bot #' + id;

    dispatch(addPlayerToGame(id, name, playerTypes.PLAYER_BOT));
};

export const roomCreated = (roomId) => {
    return {
        type:   ROOM_CREATED,
        roomId: roomId,
    }
};
export const playerConnected = (players) => {
    return {
        type:   PLAYER_CONNECTED,
        players: players,
    }
};
export const beginGame = (game) => {
    return {
        type: BEGIN_GAME,
        game: game,
    }
};
