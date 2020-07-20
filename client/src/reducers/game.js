import * as gameActions from '../actions/game';
import * as cardActions from '../actions/cards';

/*function createPlayer(id, type, name) {
    return {
        id:   id,
        type: type,
        name: name,
        playingCard: false
    }
}*/

const initialState = {
    roomId:              '',
    errorMessage:        '',
    isStarted:           false,
    isPending:           false,
    dealNum:             0,
    currentTurnPlayerId: '',
    players:             [],
    availableGames:      [],
    dealCards:           [],
};

function game(state = initialState, action) {
    switch (action.type) {
        case gameActions.CONNECT_ERROR:
            return initialState;
        case gameActions.NEW_DEAL:
            return {
                ...state,
                isPending: false,
                dealNum: state.dealNum + 1,
                players: action.result.players,
                currentTurnPlayerId: action.result.currentTurnPlayerId,
                dealCards: [],
            };
        case cardActions.USE_CARD:
        case gameActions.BEGIN_GAME_PENDING:
            return {...state, isPending: true};
        case gameActions.END_GAME_PENDING:
            return {...state, isPending: false};

        case gameActions.CARD_PLAYED:
            let playersById = {};
            state.players.forEach(player => {
                playersById[player.id] = player;
            });

            let players = action.result.players.map(player => {
                if (player.id === action.result.playerLogin) {
                    return playersById[player.id];
                }

                return player;
            });

            return {
                ...state,
                players: players,
                currentTurnPlayerId: action.result.currentTurnPlayerId,
                dealCards: action.result.dealCards.slice(0, action.result.dealCards.length - 1)
            };
        case cardActions.CARD_PLAYED_RENDER_END:
            return {
                ...state,
                players: action.result.players.map(player => {
                    return {...player, playingCard: false};
                }),
                //dealCards: action.result.dealCards,
            };
        case gameActions.CARD_PLAYED_END:
            return {
                ...state,
                /*players: action.result.players.map(player => {
                    return {...player, playingCard: false};
                }),*/
                dealCards: action.result.dealCards,
            };
        case gameActions.GAME_DATA_SUCCESS:
            return {
                ...state,
                isStarted: true,
                roomId: action.result.roomId,
                players: action.result.players.map(player => {
                    return {...player, playingCard: false};
                }),
                currentTurnPlayerId: action.result.currentTurnPlayerId,
                dealCards: action.result.dealCards,
            };
        case gameActions.BEGIN_GAME:
            return {
                ...state,
                isStarted: true,
                roomId: action.result.roomId,
                players: action.result.players,
                currentTurnPlayerId: action.result.currentTurnPlayerId,
                dealCards: action.result.dealCards,
            };
            //return {...state, isStarted: true, roomId: action.game.roomId, players: action.game.players, currentPlayerId: action.game.currentPlayerId};

        case gameActions.PLAYER_CONNECTED:
            return {...state, players: action.players};

        case gameActions.CONNECT_TO_GAME_PENDING:
            return {...state, errorMessage: ''};
        case gameActions.CONNECT_TO_GAME_SUCCESS:
            return state;
        case gameActions.CONNECT_TO_GAME_FAILURE:
            return {...state, errorMessage: action.error};

        case gameActions.GAMES_REFRESHED:
            return {
                ...state,
                availableGames: action.result,
                roomId: '',
            };
        case gameActions.GAMES_REFRESHING_FAILURE:
            return state;
        case gameActions.GAMES_REFRESHING:
            return state;

        case gameActions.GAME_CREATING:
            // TODO show a loader
            return state;
        case gameActions.GAME_CREATED:
            return state;
        case gameActions.GAME_FAILURE:
            // show an error
            return state;

        case gameActions.ROOM_CREATED:
            return {
                ...state,
                roomId: action.roomId,
            };
        /*case gameActions.ADD_PLAYER:
            let player = createPlayer(action.id, action.playerType, action.name);

            return {
                ...state,
                players: [...state.players, player]
            };*/
        case gameActions.END_GAME:
            return initialState;
        default:
            return state;
    }
}

export default game;
