import { getPossibleMoves } from '../src/player/computer';

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
});
