import gameReducer from '../reducers/game';
import * as gameActions from '../actions/game';
import * as gameSelectors from '../selectors/game';

const createPlayers = (count) => {
    let players = [];
    for (let i = 1; i <= count; i++) {
        players.push({
            id: i,
            name: 'name ' + i,
            login: 'login ' + i,
            cards: [],
        });
    }
    return players;
};

describe('game actions', () => {
    it('should select 1 top player and no side players from 1 enemy', () => {
        let enemies = createPlayers(1);

        expect(
            gameSelectors.getTopPlayers.resultFunc(enemies).length
        ).toEqual(
            1
        );
        expect(
            gameSelectors.getLeftPlayer.resultFunc(enemies)
        ).toEqual(
            false
        );
        expect(
            gameSelectors.getRightPlayer.resultFunc(enemies)
        ).toEqual(
            false
        );
    });

    it('should select 2 side players and no top players from 2 enemies', () => {
        let enemies = createPlayers(2);

        expect(
            gameSelectors.getTopPlayers.resultFunc(enemies)
        ).toEqual(
            []
        );

        expect(
            gameSelectors.getLeftPlayer.resultFunc(enemies)
        ).toEqual(
            enemies[0]
        );

        expect(
            gameSelectors.getRightPlayer.resultFunc(enemies)
        ).toEqual(
            enemies[1]
        );
    });

    it('should select 2 side players and 1 top player from 3 enemies', () => {
        let enemies = createPlayers(3);

        expect(
            gameSelectors.getTopPlayers.resultFunc(enemies).length
        ).toEqual(
            1
        );

        expect(
            gameSelectors.getLeftPlayer.resultFunc(enemies)
        ).not.toBe(false);

        expect(
            gameSelectors.getRightPlayer.resultFunc(enemies)
        ).not.toBe(false);
    });

    it('should select 2 side players and 2 top player from 4 enemies', () => {
        let enemies = createPlayers(4);

        expect(
            gameSelectors.getTopPlayers.resultFunc(enemies).length
        ).toEqual(
            2
        );

        expect(
            gameSelectors.getLeftPlayer.resultFunc(enemies)
        ).not.toBe(false);

        expect(
            gameSelectors.getRightPlayer.resultFunc(enemies)
        ).not.toBe(false);
    });
});
