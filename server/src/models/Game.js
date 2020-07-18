export default class Game {
    constructor() {
        this.currentTurnPlayerId = null;
        this.dealWinners = [];
        this.dealCards = [];
    }

    setCurrentTurnPlayerId(id) {
        this.currentTurnPlayerId = id;
    }

    setDealCards(dealCards) {
        this.dealCards = dealCards;
    }
}
