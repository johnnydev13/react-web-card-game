import GameService from '../services/Game';

export default class GameServiceFactory {
    constructor(usersStorage, roomsStorage, availableRoomsStorage, cardsLib) {
        this.usersStorage = usersStorage;
        this.roomsStorage = roomsStorage;
        this.availableRoomsStorage = availableRoomsStorage;
        this.cardsLib = cardsLib;
    }

    makeGameService() {
        return new GameService(this.usersStorage, this.roomsStorage, this.availableRoomsStorage, this.cardsLib);
    }
}
