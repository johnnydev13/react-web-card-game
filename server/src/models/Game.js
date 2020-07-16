export default class Game {
    constructor() {
        this.currentTurnPlayerId = null;
    }

    setCurrentTurnPlayerId(id) {
        this.currentTurnPlayerId = id;
    }
}
