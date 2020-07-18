import * as GameConfig from '../config/game';

export default class Game {
    constructor(usersStorage, roomsStorage, availableRoomsStorage, cardsLib) {
        this.usersStorage = usersStorage;
        this.roomsStorage = roomsStorage;
        this.availableRoomsStorage = availableRoomsStorage;

        this.cardsLib = cardsLib;
        this.game = null;
        this.room = null;
        this.players = [];

        this.deckId = '';
    }

    setGame(game) {
        this.game = game;
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
            this.updateGame();
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

    publicData(playerLogin, excludePlayingCard) {
        let players = [];

        if (typeof excludePlayingCard === 'undefined') {
            excludePlayingCard = false;
        }

        let playingCard = false;

        if (this.game.dealCards.length > 0) {
            playingCard = this.game.dealCards[this.game.dealCards.length - 1];
        }
        this.getPlayers().forEach((player, index) => {
            let cards;

            if (playerLogin !== player.login) {
                cards = player.cards.length;
            } else {
                cards = player.cards;
            }

            players.push({
                ...player,
                cards: cards,
                playingCard: playingCard && playingCard.playerId === player.id ? playingCard : false
            });
        });

        console.log(players);
        let dealCards = this.game.dealCards;

        /*if (dealCards.length > 0 && dealCards[dealCards.length - 1].playerId !== playerLogin) {
            dealCards = dealCards.slice(0, dealCards.length - 1);
        }*/
        return {
            dealCards: dealCards,
            roomId: this.room.id,
            players: players,
            currentTurnPlayerId: this.game.currentTurnPlayerId,
            dealWinners: this.game.dealWinners,
            playerLogin: playerLogin,
        }
    }
    destroyGame() {
        this.roomsStorage.delete(this.room.id);
    }
    isGameOver() {
        let players = this.getPlayers();
        return players[players.length - 1].cards.length === 0;
    }
    isDeal() {
        return this.game.dealCards.length === this.players.length;
    }
    cardScoreByValue(cardValue) {
        return ['2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE'].indexOf(cardValue)
    }
    setDealWinner() {
        let scores = {};
        this.game.dealCards.forEach(card => {
            let score = this.cardScoreByValue(card.value);
            if (typeof scores[score] === 'undefined') {
                scores[score] = [];
            }
            scores[score].push(card.playerId);
        });

        let scoreKeys = Object.keys(scores);
        scoreKeys.sort((a, b) => {
            let an = parseInt(a);
            let bn = parseInt(b);
            if (an < bn) { return 1; }
            if (an > bn) { return -1; }
            return 0;
        });

        let winScores = scoreKeys[0];
        let winners = scores[winScores];

        winners.forEach(winner => {
            this.players.map(player => {
                if (winner === player.id) {
                    player.dealWins += 1;
                    player.scores += parseInt(winScores);
                }

                return player;
            });
        });

        this.game.dealWinners = winners;
    }
    newDeal() {
        this.game.dealCards = [];
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

    findAvailableRooms(playerId) {
        let availableRooms = this.availableRoomsStorage.getAll();

        if (!availableRooms) {
            return [];
        }

        let rooms = [];
        Object.keys(availableRooms).forEach(roomId => {
            if (roomId !== playerId) {
                rooms.push(this.roomsStorage.get(roomId));
            }
        });

        return rooms;
    }

    isGame() {
        return !!this.game;
    }

    initiateById(roomId) {
        let roomData = this.roomsStorage.get(roomId);

        if (!roomData) {
            return false;
        }

        this.room    = roomData.room;
        this.game    = roomData.game;
        this.players = roomData.players;

        return true;
    }

    getPlayer(playerId) {
        let player = this.players.filter(player => player.id === playerId);

        return player.length > 0 ? player[0] : false;
    }
    alreadyInGame(playerId) {
        return !!this.getPlayer(playerId);
    }
    addCardToDeal(card, playerId) {
        this.game.dealCards = [...this.game.dealCards, {...card, playerId: playerId}];
    }
    removeCardFromPlayer(playerId, cardCode) {
        this.players.forEach((player, index) => {
            if (player.id === playerId) {
                this.players[index].cards = this.players[index].cards.filter(card => card.code !== cardCode);
            }
        });
    }
    setNextPlayer() {
        let nextPlayerIndex;
        this.players.filter((player, index) => {
            if (player.id === this.game.currentTurnPlayerId) {
                nextPlayerIndex = index + 1;
            }
        });
        if (typeof this.players[nextPlayerIndex] === 'undefined') {
            nextPlayerIndex = 0;
        }
        this.game.currentTurnPlayerId = this.players[nextPlayerIndex].id;
    }
    playCard(playerId, cardCode) {
        let player = this.getPlayer(playerId);

        if (!player) {
            return false;
        }

        let cardKey = false;
        for (let i = 0;  i < player.cards.length; i++) {
            if (player.cards[i].code === cardCode) {
                cardKey = i;
                break;
            }
        }

        // player card not found
        if (cardKey === false) {
            return false;
        }

        let card = player.cards[cardKey];

        card.playerId = playerId;

        this.addCardToDeal(card, playerId);
        this.removeCardFromPlayer(playerId, cardCode);
        this.setNextPlayer();

        return true;
    }

    canJoin(playerId) {
        return playerId !== '' && this.players.length < this.room.maxPlayers;
    }
}

