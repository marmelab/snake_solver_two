import { getPossibleMoves, getNextMove } from '../src/player/computer';
import { initializeGrid, getAdjacentCell } from '../src/game/grid';
import Game from '../src/game/game';

const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];

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
            RIGHT,
            DOWN,
        ]));
    });

    it('should return adjacent cell', () => {
        assert.equal(JSON.stringify(getAdjacentCell(UP, [1, 0])), JSON.stringify([0, 0]));
        assert.equal(JSON.stringify(getAdjacentCell(RIGHT, [0, 0])), JSON.stringify([0, 1]));
        assert.equal(JSON.stringify(getAdjacentCell(DOWN, [0, 0])), JSON.stringify([1, 0]));
        assert.equal(JSON.stringify(getAdjacentCell(LEFT, [0, 1])), JSON.stringify([0, 0]));
    });

    /*
        [ 1, 1, 1, 2, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should return next move', () => {
        const game = new Game([5, 5]);
        const nextMove = getNextMove(game);
        assert.equal(nextMove, RIGHT);
    });

    /*
        [ 0, 0, 0, 1, 2 ]
        [ 0, 0, 0, 1, 1 ]
        [ 0, 0, 0, 0, 1 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should not eat apple if no free mouvements', () => {
        const game = new Game([5, 5]);
        game.apple = [0, 4];
        game.snake = [[2, 4], [1, 4], [1, 3], [0, 3]];
        game.grid = initializeGrid(game.size, game.snake, game.apple);

        const nextMove = getNextMove(game);
        assert.equal(nextMove, LEFT);
    });

    /*
        [ 0, 0, 0, 0, 0 ]
        [ 1, 0, 0, 0, 0 ]
        [ 1, 0, 0, 0, 0 ]
        [ 1, 1, 1, 1, 1 ]
        [ 0, 2, 0, 0, 0 ]
    */
    it('should not enter in closed zone', () => {
        const game = new Game([5, 5]);
        game.apple = [4, 1];
        game.snake = [[1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4]];
        game.grid = initializeGrid(game.size, game.snake, game.apple);

        const nextMove = getNextMove(game);
        assert.equal(nextMove, UP);
    });

    it.skip('should eat last apple when finish game', () => {

    });
});