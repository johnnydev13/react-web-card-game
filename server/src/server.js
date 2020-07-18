import * as socket from 'socket.io';
import GameServiceFactory from './factories/GameServiceFactory';
import UserService from './services/User';
import UserModel from './models/User';
import GameModel from './models/Game';
import RoomModel from './models/Room';
import PlayerModel from './models/Player';
import MemoStorage from './storages/Memo';
import DecoCardsApi from './libraries/Deckofcardsapi';
import RoomError from './errors/RoomError';
import UserError from './errors/UserError';
import axios from 'axios';
import * as DeckofcardsConfig from './config/deckofcards';
import { socketPort } from './config/server';

const port = socketPort;
var io = socket.listen(port);

/* to not use database just store everything in memory*/
var UsersStorageInstance = new MemoStorage();
var RoomsStorageInstance = new MemoStorage();
var AvailableRoomsStorageInstance = new MemoStorage();

/* cards api */
var DecoCardsApiInstance = new DecoCardsApi(DeckofcardsConfig, axios);

var GameServiceFactoryInstance = new GameServiceFactory(UsersStorageInstance, RoomsStorageInstance, AvailableRoomsStorageInstance, DecoCardsApiInstance);

io.on('connection', (client) => {
    client.on('sendConnection', (data, callback) => {
        let {login, name} = data;

        let UserModelInstance = new UserModel();
        UserModelInstance.setName(name.trim());
        UserModelInstance.setLogin(login.trim());
        UserModelInstance.setClientId(client.id);

        let UserServiceInstance = new UserService(UsersStorageInstance);
        UserServiceInstance.setUser(UserModelInstance);
        UserServiceInstance.save();

        return callback(true);
    });
    client.on('getGameData', (data, callback) => {
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

        /* testing, remove*/
        /*GameServiceInstance.getPlayersConnections().forEach(data => {
            io.to(data.clientId).emit('cardPlayed', GameServiceInstance.publicData(data.login));
        });*/
    });
    client.on('profileEdit', (data, callback) => {
        let {login, name} = data;

        let UserModelInstance = new UserModel();
        UserModelInstance.setName(name.trim());
        UserModelInstance.setLogin(login.trim());
        UserModelInstance.setClientId(client.id);

        let UserServiceInstance = new UserService(UsersStorageInstance);
        UserServiceInstance.setUser(UserModelInstance);

        let error = new UserError();

        if (!UserServiceInstance.isValidName()) {
            error.addError('name', 'Invalid name, should be ' + UserServiceInstance.getNameRegex())
        }
        if (!UserServiceInstance.isValidLogin()) {
            error.addError('login', 'Invalid name, should be ' + UserServiceInstance.getLoginRegex())
        }

        if (error.hasErrors()) {
            return callback(error.get());
        }

        UserServiceInstance.save();

        return callback(UserModelInstance.get());
    });

    client.on('startGame', (data, callback) => {
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

        GameServiceInstance.setGame(GameModelInstance);
        GameServiceInstance.setRoom(RoomModelInstance);
        GameServiceInstance.addPlayer(PlayerModelInstance);

        GameServiceInstance.startGame();

        callback(true);

        client.emit('roomCreated', RoomModelInstance.get());

    });

    client.on('playCard', (data, callback) => {
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
                io.to(data.clientId).emit('cardPlayed', GameServiceInstance.publicData(data.login));
            //}
        });

        if (GameServiceInstance.isDeal()) {

            GameServiceInstance.setDealWinner();
            GameServiceInstance.newDeal();

            if (GameServiceInstance.isGameOver()) {
                GameServiceInstance.getPlayersConnections().forEach(data => {
                    io.to(data.clientId).emit('gameOver', GameServiceInstance.publicData(data.login));
                });

                GameServiceInstance.destroyGame();

                callback(true);
            }

            GameServiceInstance.getPlayersConnections().forEach(data => {
                io.to(data.clientId).emit('newDeal', GameServiceInstance.publicData(data.login));
            });
        }

        GameServiceInstance.updateGame();

        callback(true);
    });

    client.on('findGames', (data, callback) => {
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
    });

    client.on('connectToGame', (data, callback) => {
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

            GameServiceInstance.addPlayer(PlayerModelInstance);
            GameServiceInstance.updatePlayers();
        }

        GameServiceInstance.getPlayersConnections().forEach(data => {
            //if (player.id !== playerId) {
                io.to(data.clientId).emit('playerConnected', {
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
                        io.to(data.clientId).emit('gameBegins', GameServiceInstance.publicData(data.login));
                    });

                })
                .catch((err) => {

                })
        }

        callback(true);
    });

    client.on('disconnect', function (client, a, b) {

    });
});

console.log('listening on port ', port);
console.log('to change socket port, edit config/server.js');

/*

io.listen(port);*/
