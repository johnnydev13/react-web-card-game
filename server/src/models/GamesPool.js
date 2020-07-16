class Game {
    constructor(storage) {
        this.games = [];
        this.storage = storage;
    }

    addGame(game) {
        this.storage.add(game);
    }
}

export default Game;
