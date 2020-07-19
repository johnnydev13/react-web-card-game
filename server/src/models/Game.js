export default class Game {
    constructor() {
        this.currentTurnPlayerId = null;
        this.dealWinners = [];
        this.dealCards = [];
        this.results = [];
    }

    setCurrentTurnPlayerId(id) {
        this.currentTurnPlayerId = id;
    }

    setDealCards(dealCards) {
        this.dealCards = dealCards;
    }
}
