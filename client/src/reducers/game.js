import * as gameActions from '../actions/game';

function createPlayer(id, type, name) {
    return {
        id:   id,
        type: type,
        name: name,
    }
}

const initialSate = {
    roomId:              false,
    errorMessage:        false,
    isStarted:           false,
    currentPlayerId:     '',
    players:             [],
    availableGames:      [],
};

function game(state = initialSate, action) {
    switch (action.type) {
        case gameActions.BEGIN_GAME:
            return {...state, isStarted: true, roomId: action.game.roomId};

        case gameActions.PLAYER_CONNECTED:
            return {...state, players: action.players};

        case gameActions.CONNECT_TO_GAME_PENDING:
            return {...state, errorMessage: false};
        case gameActions.CONNECT_TO_GAME_SUCCESS:
            return state;
        case gameActions.CONNECT_TO_GAME_FAILURE:
            return {...state, errorMessage: action.error};

        case gameActions.GAMES_REFRESHED:
            return {
                ...state,
                availableGames: action.result,
                roomId: false,
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
        case gameActions.ADD_PLAYER:
            let player = createPlayer(action.id, action.playerType, action.name);

            return {
                ...state,
                players: [...state.players, player]
            };
        case gameActions.END_GAME:

            break;
        default:
            return state;
    }
}

export default game;
