import * as playerTypes from '../constants/playerTypes';
import { SOCKET } from '../constants/apiRequestTypes';
import {cardThrow, dealCardClearing as dealCardClearingConfig} from '../config/animation';
import { clearDealArea } from './cards';
import { showDealMesssage, showGlobalError, showGameResults, hideDealMessage } from './ui';

export const ADD_PLAYER   = 'ADD_PLAYER';
export const BEGIN_GAME   = 'BEGIN_GAME';
export const NEW_DEAL     = 'NEW_DEAL';
export const ROOM_CREATED = 'ROOM_CREATED';
export const END_GAME     = 'END_GAME';

export const CARD_PLAYED      = 'CARD_PLAYED';
export const CARD_PLAYED_END  = 'CARD_PLAYED_END';

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

export const GAME_DATA_SUCCESS = 'GAME_DATA_SUCCESS';

export const BEGIN_GAME_PENDING = 'BEGIN_GAME_PENDING';
export const END_GAME_PENDING   = 'END_GAME_PENDING';

export const CONNECT_ERROR = 'CONNECT_ERROR';

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
    onPending: GAME_CREATING,
    onSuccess: GAME_CREATED,
    onFailure: GAME_FAILURE,
    //stages: [GAME_CREATING, GAME_CREATED, GAME_FAILURE],
    promise: (socket) => {
        return socket.emit('startGame', {playerLogin, playerName, maxPlayers});
    },
});
export const startGameRequest = (playerLogin, playerName, maxPlayers) => dispatch => dispatch(startGame(playerLogin, playerName, maxPlayers));

const connectToGame = (roomId, playerLogin, playerName) => ({
    type: SOCKET,
    onPending: CONNECT_TO_GAME_PENDING,
    onSuccess: CONNECT_TO_GAME_SUCCESS,
    onFailure: CONNECT_TO_GAME_FAILURE,
    //stages: [CONNECT_TO_GAME_PENDING, CONNECT_TO_GAME_SUCCESS, CONNECT_TO_GAME_FAILURE],
    promise: (socket) => {
        return socket.emit('connectToGame', {roomId, playerLogin, playerName});
    },
});
export const connectToGameRequest = (roomId, playerLogin, playerName) => dispatch => dispatch(connectToGame(roomId, playerLogin, playerName));

const findGames = () => ({
    type: SOCKET,
    onPending: GAMES_REFRESHING,
    onSuccess: GAMES_REFRESHED,
    onFailure: GAMES_REFRESHING_FAILURE,
    //stages: [GAMES_REFRESHING, GAMES_REFRESHED, GAMES_REFRESHING_FAILURE],
    promise: (socket) => {
        return socket.emit('findGames');
    },
});
export const findGamesRequest = () => dispatch => dispatch(findGames());

const getGameData = (roomId, login) => ({
    type: SOCKET,
    onSuccess: GAME_DATA_SUCCESS,
    //stages: [GAMES_REFRESHING, GAMES_REFRESHED, GAMES_REFRESHING_FAILURE],
    promise: (socket) => {
        return socket.emit('getGameData', {roomId, login});
    },
});
export const getGameDataRequest = (roomId, login) => dispatch => dispatch(getGameData(roomId, login));

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
export const beginGame = (result) => {
    return {
        type: BEGIN_GAME,
        result: result,
    }
};

const cardPlayedAction = (result) => ({
    type:   CARD_PLAYED,
    result: result,
});

const cardPlayedEndAction = (result) => ({
    type:   CARD_PLAYED_END,
    result: result,
});
export const cardPlayed = (result) => (dispatch, getState) => {
    dispatch(hideDealMessage());

    setTimeout(function () {
        dispatch(cardPlayedEndAction(result));
    }, cardThrow.speed * 1000);

    return dispatch(cardPlayedAction(result));
};

export const pendingStart = () => {
    return {
        type: BEGIN_GAME_PENDING,
    }
};
export const pendingStop = () => {
    return {
        type: END_GAME_PENDING,
    }
};

export const newDeal = (result) => {
    return {
        type: NEW_DEAL,
        result: result,
    }
};

export const newDealSequence = (result) => (dispatch, getState) =>  {
    setTimeout(() => {
        dispatch(showDealMesssage('Deal winners', result.dealWinners.join(', ')));
        dispatch(clearDealArea());
    }, cardThrow.speed * 1000);

    setTimeout(function () {
        dispatch(newDeal(result));
    }, dealCardClearingConfig.speed * 1000);
};

export const connectError = (err) => {
    return {
        type: CONNECT_ERROR,
        error: err,
    }
};
export const connectErrorSequence = (err) => (dispatch, getState) => {
    dispatch(showGlobalError('Server is unreachable', err));
    dispatch(connectError(err));
};

export const endGame = (result) => {
    return {
        type: END_GAME,
        result
    }
};
export const gameOverSequence = (result) => dispatch =>  {
    dispatch(showGameResults(result));
    dispatch(endGame(result));
    //dispatch(showDealMesssage('Game over', result.dealWinners.join(', ')));
};
