import { createSelector } from 'reselect'

const getCards = state => state.cards;

export const getClickedCardCode = createSelector(
    [getCards],
    (cards) => {
        if (typeof cards === 'undefined') {
            return '';
        }

        return cards.clickedCardCode;
    }
);

export const getPlayingCard = createSelector(
    [getCards],
    (cards) => {
        if (typeof cards === 'undefined') {
            return {};
        }
        return cards.playingCard;
    }
);

export const getDealAreaBounds = createSelector(
    [getCards],
    (cards) => {
        if (typeof cards === 'undefined') {
            return {};
        }

        return cards.dealAreaBounds;
    }
);

export const getPlayersAreasBounds = createSelector(
    [getCards],
    (cards) => {
        if (typeof cards === 'undefined') {
            return {};
        }

        return cards.boundsByPlayer;
    }
);

export const getIsClearingDealingArea = createSelector(
    [getCards],
    (cards) => {
        if (typeof cards === 'undefined') {
            return false;
        }

        return cards.clearingDealArea;
    }
);


