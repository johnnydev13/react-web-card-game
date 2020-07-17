import * as GameConfig from '../config/game';

class Game {
    constructor(usersStorage, roomsStorage, availableRoomsStorage, cardsLib) {
        this.usersStorage = usersStorage;
        this.roomsStorage = roomsStorage;
        this.availableRoomsStorage = availableRoomsStorage;

        this.cardsLib = cardsLib;
        this.game = null;
        this.room = null;
        this.players = [];

        this.cards = {};
        this.deckId = '';
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
        if (!this.isDeck()) {
            return new Promise((resolve, reject) => {
                return reject();
            });
        }

        return this.cardsLib.drawFromDeck(this.deckId, this.players.length * GameConfig.cardPerGame).then(cards => {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].cards = cards.slice(i * GameConfig.cardPerGame, (i + 1) * GameConfig.cardPerGame);
            }

            return true;
        }).catch(err => {
            console.error('drawFromDeck error:', err);

            return err;
        });
    }

    createDeck() {
        if (this.isDeck()) {
            return new Promise((resolutionFunc) => {
                return resolutionFunc(true);
            });
        }
        return this.cardsLib.createDeck().then(deckId => {
            this.deckId = deckId;
        }).catch(err => {
            return err;
        });
    }

    startNewGame() {
        this.roomsStorage.set(this.room.id, {
            room:    this.room,
            game:    this.game,
            players: this.players,
        });
        this.availableRoomsStorage.set(this.room.id, this.room.id);
    }

    startGame() {
        this.startNewGame();
    }

    getPlayersConnections() {
        let conns = [];

        this.getPlayers().forEach(player => {
            let user = this.usersStorage.get(player.login);
            conns.push({clientId: user.clientId, login: player.login});
        });

        return conns;
    }

    isFullRoom() {
        return this.room.maxPlayers === this.players.length;
    }

    updatePlayers() {
        this.updateGame();

        if (this.isFullRoom()) {
            this.availableRoomsStorage.delete(this.room.id);
        }
    }

    getPlayers() {
        return this.players;
    }

    publicData(playerLogin) {
        let players = [];

        this.getPlayers().forEach((player, index) => {
            let cards;

            if (playerLogin !== player.login) {
                cards = player.cards.length;
            } else {
                cards = player.cards;
            }

            players.push({...player, cards: cards});
            //console.log('playerLogin', playerLogin, 'player.login', player.login, cards);
            /*console.log('playerLogin', playerLogin, 'player.login', player.login, 'index', index);
            console.log('returnPlayers', returnPlayers[index]);*/
        });

        return {
            roomId: this.room.id,
            players: players,
            currentTurnPlayerId: this.game.currentTurnPlayerId,
        }
    }

    setGameUnavailable() {

    }

    updateGame() {
        this.roomsStorage.set(this.room.id, {
            deckId:  this.deckId,
            room:    this.room,
            game:    this.game,
            players: this.players,
        });
    }

    getRoomById(roomId) {
        return this.roomsStorage.get(roomId);
    }

    findAvailableRoom() {
        let availableRooms = this.availableRoomsStorage.getAll();

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
        let availableRooms = this.availableRoomsStorage.getAll();

        if (!availableRooms) {
            return [];
        }

        let rooms = [];
        let keys = Object.keys(availableRooms).forEach(roomId => {
            if (roomId !== playerId) {
                console.log(this.roomsStorage.get(roomId));
                rooms.push(this.roomsStorage.get(roomId));
            }
        });

        return rooms;
    }

    isGame() {
        return !!this.game;
    }

    findRoomById(roomId) {
        let room = this.roomsStorage.get(roomId);

        return room || false;
    }

    initiateById(roomId) {
        let roomData = this.roomsStorage.get(roomId);

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
