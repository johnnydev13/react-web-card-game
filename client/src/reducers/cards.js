import {
    CLICK_CARD,
    USE_CARD,
    DEAL_AREA_BOUNDS,
    UNCLICK_CARD,
    PLAYER_AREA_BOUNDS,
    CLEAR_DEAL_AREA, CARD_PLAYED_RENDER_END,
} from '../actions/cards';
import {
    CARD_PLAYED,
    CARD_PLAYED_END,
    NEW_DEAL
} from '../actions/game';


const initialState = {
    clickedCardCode: '',
    // my card to animate
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
    boundsByPlayer: {
        // keys are playerIds
    },
    cardPlayed: {},
    clearingDealArea: false,
};

function cards(state = initialState, action) {
    switch (action.type) {
        case CARD_PLAYED_RENDER_END:
            return {...state, cardPlayed: {}, playingCard: {code: '', bounds: {}}};
        /*case CARD_PLAYED_END:
            return state;*/
        case CLEAR_DEAL_AREA:
            return {...state, clearingDealArea: true};
        case NEW_DEAL:
            return {...state, clearingDealArea: false};
        case CARD_PLAYED:
            let newState = {...state, cardPlayed: action.result.cardPlayed};
            return newState;
        case PLAYER_AREA_BOUNDS:
            let playerBounds = {};
            playerBounds[action.playerId] = action.bounds;
            return {...state, boundsByPlayer: {...state.boundsByPlayer, ...playerBounds}};
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
