import * as gameActions from '../actions/game';

function createPlayer(id, type, name) {
    return {
        id:   id,
        type: type,
        name: name,
    }
}

const initialSate = {
    isFetching:      false,
    isStarted:       false,
    currentPlayerId: '',
    players:         [],
};

function game(state = initialSate, action) {
    switch (action.type) {
        case gameActions.GAME_CREATED:
            console.log('GAME_CREATED');
            return {
                ...state,
                isFetching: true,
            };
        case gameActions.BEGIN_GAME:
            console.log('BEGIN_GAME');
            return {
                ...state,
                isFetching: false,
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
