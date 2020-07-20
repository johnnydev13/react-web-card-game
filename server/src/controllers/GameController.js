import BaseController from './BaseController';
import GameModel from "../models/Game";
import RoomModel from "../models/Room";
import PlayerModel from "../models/Player";
import UsersStorageSingleton from "../singletons/UsersStorageSingleton";
import MemoStorage from "../storages/Memo";
import DecoCardsApi from "../libraries/Deckofcardsapi";
import * as DeckofcardsConfig from "../config/deckofcards";
import axios from "axios";
import GameServiceFactory from "../factories/GameServiceFactory";
import RoomError from "../errors/RoomError";

/* to not use database just store everything in memory*/
var UsersStorageInstance = UsersStorageSingleton.getInstance().get();
var RoomsStorageInstance = new MemoStorage();
var AvailableRoomsStorageInstance = new MemoStorage();

/* cards api */
var DecoCardsApiInstance = new DecoCardsApi(DeckofcardsConfig, axios);

var GameServiceFactoryInstance = new GameServiceFactory(UsersStorageInstance, RoomsStorageInstance, AvailableRoomsStorageInstance, DecoCardsApiInstance);

export default class GameController extends BaseController{
    constructor() {
        super();
    }

    actionStartGame(client, data, callback) {
        let { playerLogin, playerName, maxPlayers } = data;

        let roomId = playerLogin;
        let playerId = playerLogin;

        let GameServiceInstance = GameServiceFactoryInstance.makeGameService();

        //GameServiceInstance.createDeck();

        let GameModelInstance = new GameModel();
        GameModelInstance.setCurrentTurnPlayerId(playerId);

        let RoomModelInstance = new RoomModel();
        RoomModelInstance.setId(roomId);
        RoomModelInstance.setMaxPlayers(maxPlayers);

        let PlayerModelInstance = new PlayerModel();
        PlayerModelInstance.setId(playerId);
        PlayerModelInstance.setLogin(playerLogin);
        PlayerModelInstance.setClientId(client.id);
        PlayerModelInstance.setName(playerName);
        PlayerModelInstance.setNum(GameServiceInstance.getPlayers().length + 1);

        GameServiceInstance.setGame(GameModelInstance);
        GameServiceInstance.setRoom(RoomModelInstance);
        GameServiceInstance.addPlayer(PlayerModelInstance);

        GameServiceInstance.startGame();

        callback(true);

        client.emit('roomCreated', RoomModelInstance.get());
    }

    actionGetGameData(client, data, callback) {
        let {roomId, login} = data;

        const playerId = login;

        let GameServiceInstance = GameServiceFactoryInstance.makeGameService();

        GameServiceInstance.initiateById(roomId);

        if (!GameServiceInstance.isGame()) {
            let error = new RoomError('Game not found');

            return callback(error);
        }

        let inGame = GameServiceInstance.alreadyInGame(playerId);

        if (!inGame) {
            let error = new RoomError('Game is unavailable');

            return callback(error);
        }

        callback(GameServiceInstance.publicData(login, true));
    }

    actionStartGame(client, data, callback) {
        let { playerLogin, playerName, maxPlayers } = data;

        let roomId = playerLogin;
        let playerId = playerLogin;

        let GameServiceInstance = GameServiceFactoryInstance.makeGameService();

        //GameServiceInstance.createDeck();

        let GameModelInstance = new GameModel();
        GameModelInstance.setCurrentTurnPlayerId(playerId);

        let RoomModelInstance = new RoomModel();
        RoomModelInstance.setId(roomId);
        RoomModelInstance.setMaxPlayers(maxPlayers);

        let PlayerModelInstance = new PlayerModel();
        PlayerModelInstance.setId(playerId);
        PlayerModelInstance.setLogin(playerLogin);
        PlayerModelInstance.setClientId(client.id);
        PlayerModelInstance.setName(playerName);
        PlayerModelInstance.setNum(GameServiceInstance.getPlayers().length + 1);

        GameServiceInstance.setGame(GameModelInstance);
        GameServiceInstance.setRoom(RoomModelInstance);
        GameServiceInstance.addPlayer(PlayerModelInstance);

        GameServiceInstance.startGame();

        callback(true);

        client.emit('roomCreated', RoomModelInstance.get());
    }

    actionPlayCard(client, data, callback) {
        let { cardCode, login, roomId } = data;
        let playerId = login;

        let GameServiceInstance = GameServiceFactoryInstance.makeGameService();

        GameServiceInstance.initiateById(roomId);

        if (!GameServiceInstance.isGame()) {
            return callback(new RoomError('Game not found'));
        }

        let player = GameServiceInstance.getPlayer(playerId);

        if (!player) {
            return callback(new RoomError('Something went wrong, not in the game'));
        }

        let playResult = GameServiceInstance.playCard(playerId, cardCode);

        if (!playResult) {
            return callback(new RoomError('Couldn\'t play card'));
        }

        GameServiceInstance.getPlayersConnections().forEach(data => {
            //if (login !== data.login) {
            this.io.to(data.clientId).emit('cardPlayed', GameServiceInstance.publicData(data.login));
            //}
        });

        if (GameServiceInstance.isDeal()) {

            GameServiceInstance.setDealWinner();
            GameServiceInstance.newDeal();

            if (GameServiceInstance.isGameOver()) {
                GameServiceInstance.setGameResults();

                GameServiceInstance.getPlayersConnections().forEach(data => {
                    this.io.to(data.clientId).emit('gameOver', GameServiceInstance.publicData(data.login));
                });

                GameServiceInstance.destroyGame();

                return callback(true);
            }

            GameServiceInstance.getPlayersConnections().forEach(data => {
                this.io.to(data.clientId).emit('newDeal', GameServiceInstance.publicData(data.login));
            });
        }

        GameServiceInstance.updateGame();

        callback(true);
    }

    actionFindGames(client, data, callback) {
        let GameServiceInstance = GameServiceFactoryInstance.makeGameService();

        let rooms = GameServiceInstance.findAvailableRooms(client.id);

        let roomsToShow = [];

        rooms.forEach((row, index) => {
            let _room = {
                id:         row.room.id,
                name:       'Game #' + index,
                players:    row.players.length,
                maxPlayers: row.room.maxPlayers,
            };

            roomsToShow.push(_room);
        });

        callback(roomsToShow);
    }

    actionConnectToGame(client, data, callback) {
        let {roomId, playerLogin, playerName} = data;
        let playerId = playerLogin;

        let GameServiceInstance = GameServiceFactoryInstance.makeGameService();

        GameServiceInstance.initiateById(roomId);

        if (!GameServiceInstance.isGame()) {
            let error = new RoomError('Game not found');

            return callback(error);
        }

        let inGame = GameServiceInstance.alreadyInGame(playerId);

        if (!inGame && !GameServiceInstance.canJoin(playerId)) {
            let error = new RoomError('Cannot connect to a game');

            return callback(error);
        }

        if (!inGame) {

            let PlayerModelInstance = new PlayerModel();
            PlayerModelInstance.setId(playerId);
            PlayerModelInstance.setLogin(playerLogin);
            PlayerModelInstance.setClientId(client.id);
            PlayerModelInstance.setName(playerName);
            PlayerModelInstance.setNum(GameServiceInstance.getPlayers().length + 1);

            GameServiceInstance.addPlayer(PlayerModelInstance);
            GameServiceInstance.updatePlayers();
        }

        GameServiceInstance.getPlayersConnections().forEach(data => {
            //if (player.id !== playerId) {
            this.io.to(data.clientId).emit('playerConnected', {
                players: GameServiceInstance.getPlayers()
            });
            //}
        });

        if (GameServiceInstance.isFullRoom()) {
            GameServiceInstance.createDeck()
                .then(() => {
                    return GameServiceInstance.drawToPlayers();
                })
                .catch(() => {

                })
                .then(() => {
                    GameServiceInstance.getPlayersConnections().forEach(data => {
                        this.io.to(data.clientId).emit('gameBegins', GameServiceInstance.publicData(data.login));
                    });

                })
                .catch((err) => {

                })
        }

        callback(true);
    }
}
