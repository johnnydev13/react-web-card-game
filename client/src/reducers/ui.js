import * as uiActions from '../actions/ui';
import * as gameActions from '../actions/game';

const initialState = {
    dealWinners: [],
    globalError: false,
};

function ui(state = initialState, action) {
    switch (action.type) {
        case uiActions.HIDE_GLOBAL_ERROR:
            return {...state, globalError: false};
        case gameActions.CONNECT_ERROR:
            return {...state, globalError: 'Couldn\'t connect to a server: ' + action.error};
        case uiActions.SHOW_DEAL_WINNER:
            return {...state, dealWinners: action.dealWinners};
        default:
            return state;
    }
}

export default ui;
