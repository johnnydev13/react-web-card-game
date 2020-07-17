import {SOCKET} from '../constants/apiRequestTypes';
import {cardThrow} from '../config/animation';

export const CLICK_CARD       = 'CLICK_CARD';
export const UNCLICK_CARD     = 'UNCLICK_CARD';
export const USE_CARD         = 'USE_CARD';
export const DEAL_AREA_BOUNDS = 'DEAL_AREA_BOUNDS';

export const PLAY_CARD_SUCCESS = 'PLAY_CARD_SUCCESS';

export const myCardClick = (code)  => ({
    type: CLICK_CARD,
    code: code
});
export const tryMyCardClick = (code) => (dispatch, getState) =>  {
    if (getState().cards.playingCard.code === code) {
        // a card already in deal area
        return false;
    }
    return dispatch(myCardClick(code));
};

export const myCardUnClick = ()  => ({
    type: UNCLICK_CARD
});
const useCard = (code, cardBounds) => ({
    type: USE_CARD,
    code,
    cardBounds
});
const playCard = (cardCode) => ({
    type: SOCKET,
    onSuccess: PLAY_CARD_SUCCESS,
    promise: (socket) => {
        return socket.emit('playCard', {cardCode});
    },
});
export const tryUseCard = (code, cardBounds) => (dispatch, getState) =>  {
    if (getState().game.isPending) {
        return false;
    }

    setTimeout(function () {
        dispatch(playCard(code));
    }, cardThrow.speed * 1000);

    dispatch(myCardUnClick());

    return dispatch(useCard(code, cardBounds));
};

const DealAreaBounds = (width, height, top, left) => ({
    type: DEAL_AREA_BOUNDS,
    bounds: {width, height, top, left}
});
export const saveDealAreaBounds = (width, height, top, left) => (dispatch, getState)=> {
    return dispatch(DealAreaBounds(width, height, top, left));
};
