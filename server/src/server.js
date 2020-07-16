import * as socket from 'socket.io';
import GameServiceFactory from './factories/GameServiceFactory';
import GameService from './services/Game';
import UserService from './services/User';
import UserModel from './models/User';
import GameModel from './models/Game';
import GamesPool from './models/GamesPool';
import RoomModel from './models/Room';
import PlayerModel from './models/Player';
import MemoStorage from './storages/Memo';
import DecoCardsApi from './libraries/Deckofcardsapi';
import RoomError from './errors/RoomError';
import UserError from './errors/UserError';
import axios from 'axios';
import * as DeckofcardsConfig from './config/deckofcards';

const port = 3002;
var io = socket.listen(port);

var MemoStorageInstance = new MemoStorage();
var DecoCardsApiInstance = new DecoCardsApi(DeckofcardsConfig, axios);

var GameServiceFactoryInstance = new GameServiceFactory(MemoStorageInstance, DecoCardsApiInstance);

let GameServiceInstance = GameServiceFactoryInstance.makeGameService();
GameServiceInstance.setRoom({id: 1});

GameServiceInstance.createDeck()
    .then(() => GameServiceInstance.drawToPlayers())
    .then((cards) => console.log('done'));
/*.then(() => {
    GameServiceInstance.drawToPlayers();
});*/

io.on('connection', (client) => {
    client.on('sendConnection', (data, callback) => {
        let {login, name} = data;

        let UserModelInstance = new UserModel();
        UserModelInstance.setName(name.trim());
        UserModelInstance.setLogin(login.trim());
        UserModelInstance.setClientId(client.id);

        let UserServiceInstance = new UserService(MemoStorageInstance);
        UserServiceInstance.setUser(UserModelInstance);
        UserServiceInstance.save();

        return callback(true);
    });
    client.on('profileEdit', (data, callback) => {
        let {login, name} = data;

        let UserModelInstance = new UserModel();
        UserModelInstance.setName(name.trim());
        UserModelInstance.setLogin(login.trim());
        UserModelInstance.setClientId(client.id);

        let UserServiceInstance = new UserService(MemoStorageInstance);
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

        GameServiceInstance.createDeck();

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

        //console.log('total games', games);
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

        GameServiceInstance.getPlayersConnections().forEach(clientId => {
            //if (player.id !== playerId) {
                io.to(clientId).emit('playerConnected', {
                    players: GameServiceInstance.getPlayers()
                });
            //}
        });

        if (GameServiceInstance.isFullRoom()) {
            if (!GameServiceInstance.isDeck()) {
                GameServiceInstance.createDeck().then(() => {
                    GameServiceInstance.drawToPlayers().then(() => {
                        GameServiceInstance.getPlayersConnections().forEach(clientId => {
                            io.to(clientId).emit('gameBegins', GameServiceInstance.publicData());
                        });
                    });
                }).catch(() => {
                    // send a error here
                    console.error('creatingDeck error:', err);
                });
            } else {
                GameServiceInstance.getPlayersConnections().forEach(clientId => {
                    io.to(clientId).emit('gameBegins', GameServiceInstance.publicData());
                });
            }
        }

        callback(true);
    });

    client.on('disconnect', function (client, a, b) {
        console.log('disconnected', client);
    });
});

console.log('listening on port ', port);

/*

io.listen(port);*/
