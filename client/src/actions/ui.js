export const SHOW_DEAL_WINNER = 'SHOW_DEAL_WINNER';
export const HIDE_GLOBAL_ERROR = 'HIDE_GLOBAL_ERROR';

export const showDealWinner = (dealWinners) => {
    return {
        type: SHOW_DEAL_WINNER,
        dealWinners: dealWinners,
    }
};

export const hideGlobalError = () => {
    return {
        type: HIDE_GLOBAL_ERROR,
    }
};
