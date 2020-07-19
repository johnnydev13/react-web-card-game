import { dealMessage } from '../config/animation';

export const SHOW_DEAL_MESSAGE    = 'SHOW_DEAL_MESSAGE';
export const HIDE_DEAL_MESSAGE    = 'HIDE_DEAL_MESSAGE';
export const DESTROY_DEAL_MESSAGE = 'DESTROY_DEAL_MESSAGE';

export const SHOW_GLOBAL_ERROR = 'SHOW_GLOBAL_ERROR';
export const HIDE_GLOBAL_ERROR = 'HIDE_GLOBAL_ERROR';

export const SHOW_GAME_RESULTS = 'SHOW_GAME_RESULTS';
export const HIDE_GAME_RESULTS = 'HIDE_GAME_RESULTS';

export const showGlobalError = (title, text) => {
    return {
        type: SHOW_GLOBAL_ERROR,
        title: title,
        text: text
    }
};
export const showDealMessageAction = (title, text) => {
    return {
        type: SHOW_DEAL_MESSAGE,
        title: title,
        text: text,
    }
};
export const hideDealMessage = () => {
    return {
        type: HIDE_DEAL_MESSAGE
    }
};
export const destroyDealMessage = () => {
    return {
        type: DESTROY_DEAL_MESSAGE
    }
};
export const showGameResults = (result) => {
    return {
        type: SHOW_GAME_RESULTS,
        result
    }
};
export const hideGameResults = () => {
    return {
        type: HIDE_GAME_RESULTS
    }
};

export const showDealMesssage = (title, text) => dispatch => {
    setTimeout(() => {
        dispatch(hideDealMessage());
    }, dealMessage.disappearSpeed * 1000);
    setTimeout(() => {
        dispatch(destroyDealMessage());
    }, (dealMessage.disappearSpeed + dealMessage.destroySpeed) * 1000);

    return dispatch(showDealMessageAction(title, text))
};

export const hideGlobalError = () => {
    return {
        type: HIDE_GLOBAL_ERROR,
    }
};
