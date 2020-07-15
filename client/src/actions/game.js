import * as playerTypes from '../constants/playerTypes';

export const ADD_PLAYER = 'ADD_PLAYER';
export const BEGIN_GAME = 'BEGIN_GAME';
export const END_GAME   = 'END_GAME';

export const GAME_CREATING = 'GAME_CREATING';
export const GAME_CREATED  = 'GAME_CREATED';
export const GAME_FAILURE  = 'GAME_FAILURE';

const generatePlayerId = players => {
    return players.length + 1;
};

const addPlayerToGame = (id, name, playerType) => ({
    type:       ADD_PLAYER,
    id:         id,
    name:       name,
    playerType: playerType,
});

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

export const startGame = (playerName, maxPlayers) => (dispatch, getState) => {
    dispatch({
        type:    'socket',
        types:   [GAME_CREATING, GAME_CREATED, GAME_FAILURE],
        promise: (socket) => {
            return socket.emit('startGame', {playerName, maxPlayers});
        }, //
    })
};
