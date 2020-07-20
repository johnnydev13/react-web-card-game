import GameController from '../controllers/GameController';
import UserController from '../controllers/UserController';
import SystemController from '../controllers/SystemController';

const routes = [
    {
        controller: new UserController(),
        routes: [
            'sendConnection',
            'profileEdit',
        ]
    },
    {
        controller: new GameController(),
        routes: [
            'getGameData',
            'startGame',
            'playCard',
            'findGames',
            'connectToGame',
        ]
    },
    {
        controller: new SystemController(),
        routes: [
            'disconnect',
        ]
    },
];

export default routes;
