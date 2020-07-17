import { CLICK_CARD, USE_CARD, DEAL_AREA_BOUNDS, UNCLICK_CARD } from '../actions/cards';

const initialState = {
    clickedCardCode: '',
    playingCard: {
        code: '',
        bounds: {},
    },
    dealAreaBounds: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
    },
};

function cards(state = initialState, action) {
    switch (action.type) {
        case DEAL_AREA_BOUNDS:
            return {...state, dealAreaBounds: action.bounds};
        case USE_CARD:
            return {...state, playingCard: { code: action.code, bounds: action.cardBounds}};
        case UNCLICK_CARD:
            return {...state, clickedCardCode: ''};
        case CLICK_CARD:
            return {...state, clickedCardCode: action.code};
        default:
            return state;
    }
}

export default cards;
