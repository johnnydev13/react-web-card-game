import * as uiActions from '../actions/ui';

const initialState = {
    dealWinners: [],
    dealMessage: {
        title: '',
        text: '',
        isDisapper: false,
    },
    globalError: '',
    gameResults: {},
};

function ui(state = initialState, action) {
    switch (action.type) {
        case uiActions.SHOW_GLOBAL_ERROR:
            return {...state, globalError: action.title + ': ' + action.text};
        case uiActions.HIDE_GLOBAL_ERROR:
            return {...state, globalError: ''};

        case uiActions.SHOW_DEAL_MESSAGE:
            return {...state, dealMessage: {title: action.title, text: action.text, isDisapper: false}};
        case uiActions.HIDE_DEAL_MESSAGE:
            return {...state, dealMessage: {...initialState.dealMessage, isDisapper: true}};
        case uiActions.DESTROY_DEAL_MESSAGE:
            return {...state, dealMessage: initialState.dealMessage};

        case uiActions.SHOW_GAME_RESULTS:
            return {...state, gameResults: action.result.results};
        case uiActions.HIDE_GAME_RESULTS:
            return {...state, gameResults: {}};

        default:
            return state;
    }
}

export default ui;
