import { createSelector } from 'reselect'

const getPlayers = state => state.game.players;
const getCurrentTurnPlayerId = state => state.game.currentTurnPlayerId;
const getEnemyPlayers = state => state.game.players.filter(player => player.login !== state.user.login);
const getMyLogin = state => state.user.login;
const getMyId = state => state.user.login;

export const getMe = createSelector(
    [getPlayers, getMyLogin],
    (players, myLogin) => {
        return players.filter(player => player.login === myLogin)[0];
    }
);

export const getTopPlayers = createSelector(
    [getEnemyPlayers],
    (players) => {
        switch (players.length) {
            case 1:
                return players;
            case 3:
                return players.slice(1, 2);
            case 4:
                return players.slice(1, 3);
            default:
                return [];
        }
    }
);

export const getLeftPlayer = createSelector(
    [getEnemyPlayers],
    (players) => {
        if (players.length > 1) {
            return players[0];
        }

        return false;
    }
);

export const getRightPlayer = createSelector(
    [getEnemyPlayers],
    (players) => {
        if (players.length > 1) {
            return players[players.length - 1];
        }

        return false;
    }
);

export const isMyTurn = createSelector(
    [getMyId, getCurrentTurnPlayerId],
    (id, currentTurnPlayerId) => {
        return id === currentTurnPlayerId;
    }
);
