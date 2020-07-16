import GameService from '../services/Game';

export default class GameServiceFactory {
    constructor(storage, cardsLib) {
        this.storage  = storage;
        this.cardsLib = cardsLib;
    }

    makeGameService() {
        return new GameService(this.storage, this.cardsLib);
    }
}
