import * as GameConfig from '../config/game';

class Game {
    constructor(storage, cardsLib) {
        this.storage = storage;
        this.cardsLib = cardsLib;
        this.game = null;
        this.room = null;
        this.players = [];
        this.gamesPool = null;

        this.cards = {};
        this.deckId = '';

        this.deckPoolKey = 'deck';
        this.userPoolKey = 'user';
        this.roomsPoolKey = 'rooms';
        this.availableRoomsPoolKey = 'available-rooms';
    }

    setGame(game) {
        this.game = game;
    }

    setGamesPool(gamesPool) {
        this.gamesPool = gamesPool;
    }

    setRoom(room) {
        this.room = room;
    }

    addPlayer(player) {
        this.players = [...this.players, player];
    }

    isDeck() {
        return this.deckId !== '';
    }

    drawToPlayers() {
        return this.cardsLib.drawFromDeck(this.deckId, /*this.players.length * */GameConfig.cardPerGame).then(cards => {
            console.log('cards received')
            return cards;
        }).catch(err => {
            console.error('drawFromDeck error:', err);
        });
    }

    createDeck() {
        return this.cardsLib.createDeck().then(deckId => {
            this.deckId = deckId;
            console.log(deckId)
            //this.storage.setInPool(this.deckPoolKey, this.room.id, deckId);
        }).catch(err => {
            return err;
        });
    }

    startNewGame() {
        this.storage.setInPool(this.roomsPoolKey, this.room.id, {
            room:    this.room,
            game:    this.game,
            players: this.players,
        });
        this.storage.setInPool(this.availableRoomsPoolKey, this.room.id, this.room.id);
    }

    startGame() {
        this.startNewGame();
    }

    getPlayersConnections() {
        let conns = [];

        this.getPlayers().forEach(player => {
            let user = this.storage.getByKey(this.userPoolKey, player.login);
            conns.push(user.clientId);
        });

        return conns;
    }

    isFullRoom() {
        return this.room.maxPlayers === this.players.length;
    }

    updatePlayers() {
        this.updateGame();

        if (this.isFullRoom()) {
            this.storage.removeByKey(this.availableRoomsPoolKey, this.room.id);
        }
    }

    getPlayers() {
        return this.players;
    }

    publicData() {
        return {
            roomId: this.room.id,
            players: this.getPlayers(),
            currentTurnPlayerId: this.game.currentTurnPlayerId,
        }
    }

    setGameUnavailable() {

    }

    updateGame() {
        this.storage.setInPool(this.roomsPoolKey, this.room.id, {
            deckId:  this.deckId,
            room:    this.room,
            game:    this.game,
            players: this.players,
        });
    }

    getRoomById(roomId) {
        return this.storage.getByKey(this.roomsPoolKey, roomId);
    }

    findAvailableRoom() {
        let availableRooms = this.storage.getPool(this.availableRoomsPoolKey);

        if (!availableRooms) {
            return false;
        }

        let keys = Object.keys(availableRooms);
        let roomId = keys[0];
        let roomData = this.getRoomById(roomId);

        if (!roomData) {
            return false;
        }

        this.initFromData(roomData);

        return this.getRoomById(roomId);
    }

    findAvailableRooms(playerId) {
        let availableRooms = this.storage.getPool(this.availableRoomsPoolKey);

        if (!availableRooms) {
            return [];
        }

        let rooms = [];
        let keys = Object.keys(availableRooms).forEach(roomId => {
            if (roomId !== playerId) {
                console.log(this.storage.getByKey(this.roomsPoolKey, roomId));
                rooms.push(this.storage.getByKey(this.roomsPoolKey, roomId));
            }
        });

        return rooms;
    }

    isGame() {
        return this.game && this.game;
    }

    findRoomById(roomId) {
        let room = this.storage.getByKey(this.roomsPoolKey, roomId);

        return room || false;
    }

    initiateById(roomId) {
        let roomData = this.storage.getByKey(this.roomsPoolKey, roomId);

        console.log('roomData', roomData);
        if (!roomData) {
            return false;
        }

        this.room    = roomData.room;
        this.game    = roomData.game;
        this.players = roomData.players;

        return true;
    }

    alreadyInGame(playerId) {
        let alreadyInGame = this.players.filter(player => player.id === playerId);

        console.log('alreadyInGame', alreadyInGame.length);

        return alreadyInGame.length > 0 || false;
    }

    canJoin(playerId) {
        return playerId !== '' && this.players.length < this.room.maxPlayers;
    }

}

export default Game;
