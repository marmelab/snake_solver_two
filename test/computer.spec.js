import { getPossibleMoves, getNextMove } from '../src/player/computer';
import Game from '../src/game/game';

describe('computer', () => {
    it('should return possible moves', () => {
        const grid = [
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];
        const snake = [[0, 0], [0, 1], [0, 2]];
        const head = snake[snake.length - 1];
        const possibleMoves = getPossibleMoves(head, grid);
        assert.equal(JSON.stringify(possibleMoves), JSON.stringify([
            [0, 3],
            [1, 2],
        ]));
    });

    /*
        [ 1, 1, 1, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should return next move', () => {
        const game = new Game([5, 5]);
        const nextMove = getNextMove(game);
        assert.equal(JSON.stringify(nextMove), JSON.stringify([0, 3]));
    });
});
