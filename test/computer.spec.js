import { getPossibleMoves, getNextMove } from '../src/player/computer';
import { getAdjacentCell } from '../src/game/grid';
import Game from '../src/game/game';

const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];

describe('computer', () => {
    it('should return adjacent cell', () => {
        assert.equal(JSON.stringify(getAdjacentCell(UP, [1, 0])), JSON.stringify([0, 0]));
        assert.equal(JSON.stringify(getAdjacentCell(RIGHT, [0, 0])), JSON.stringify([0, 1]));
        assert.equal(JSON.stringify(getAdjacentCell(DOWN, [0, 0])), JSON.stringify([1, 0]));
        assert.equal(JSON.stringify(getAdjacentCell(LEFT, [0, 1])), JSON.stringify([0, 0]));
    });

    /*
        [1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    */
    it('should return possible moves', () => {
        const snake = [[0, 0], [0, 1], [0, 2]];
        const possibleMoves = getPossibleMoves(snake, [5, 5]);
        assert.equal(JSON.stringify(possibleMoves), JSON.stringify([
            RIGHT,
            DOWN,
        ]));
    });

    /*
        [ 0, 0, 0, 1, 2 ]
        [ 0, 0, 0, 1, 1 ]
        [ 0, 0, 0, 0, 1 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should not eat apple if no free mouvements', function * () {
        const game = new Game([5, 5]);
        game.apple = [0, 4];
        game.snake = [[2, 4], [1, 4], [1, 3], [0, 3]];

        const { nextMove } = yield getNextMove(game);
        assert.equal(nextMove, LEFT);
    });

    /*
        [ 1, 1, 1, 0, 0 ]
        [ 1, 0, 0, 0, 0 ]
        [ 1, 0, 0, 0, 0 ]
        [ 1, 1, 1, 1, 1 ]
        [ 0, 2, 0, 0, 0 ]
    */
    it('should not enter in closed zone', function * () {
        const game = new Game([5, 5]);
        game.apple = [4, 1];
        game.snake = [[0, 2], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4]];

        const { nextMove } = yield getNextMove(game);
        assert.equal(nextMove, UP);
    });

    /*
        [ 1, 1, 1, 1, 1 ]
        [ 1, 1, 1, 1, 1 ]
        [ 1, 1, 1, 1, 1 ]
        [ 1, 1, 1, 1, 1 ]
        [ 2, 1, 1, 1, 1 ]
    */
    it('should eat last apple when finish game', function * () {
        const game = new Game([5, 5]);
        game.apple = [4, 0];
        game.snake = [
            [4, 2], [4, 3], [4, 4], [3, 4], [2, 4], [2, 3], [3, 3], [3, 2], [2, 2], [2, 1], [1, 1], [1, 2],
            [1, 3], [1, 4], [0, 4], [0, 3], [0, 2], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [4, 1],
        ];

        const { nextMove } = yield getNextMove(game);
        game.nextTick(nextMove);

        assert.equal(nextMove, LEFT);
        assert.equal(game.apple, '');
    });

    /*
        [ 1, 1, 1, 2, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should return next move', function * () {
        const game = new Game([5, 5]);
        const { nextMove } = yield getNextMove(game);
        assert.equal(nextMove, RIGHT);
    });

    /*
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 1, 1, 0, 0 ]
        [ 1, 1, 1, 0, 0 ]
        [ 2, 0, 0, 0, 0 ]
    */
    it('should return next move (2)', function * () {
        const game = new Game([5, 5]);
        game.apple = [4, 0];
        game.snake = [[2, 1], [2, 2], [3, 2], [3, 1], [3, 0]];

        const { nextMove } = yield getNextMove(game);
        assert.equal(nextMove, DOWN);
    });

    /*
        [ 1, 0, 0, 2, 0 ]
        [ 1, 1, 1, 1, 1 ]
        [ 0, 1, 1, 1, 1 ]
        [ 1, 1, 1, 1, 1 ]
        [ 1, 1, 1, 1, 1 ]
    */
    it('should return next move (3)', function * () {
        const game = new Game([5, 5]);
        game.apple = [0, 3];
        game.snake = [[1, 4], [2, 4], [3, 4], [4, 4], [4, 3], [3, 3], [3, 2], [4, 2],
         [4, 1], [4, 0], [3, 0], [3, 1], [2, 1], [2, 2], [2, 3], [1, 3], [1, 2], [1, 1], [1, 0], [0, 0]];

        const { nextMove } = yield getNextMove(game);
        assert.equal(nextMove, RIGHT);
    });

    /*
        [ 1, 1, 1, 1, 1 ]
        [ 1, 0, 0, 0, 2 ]
        [ 1, 1, 1, 1, 0 ]
        [ 1, 1, 1, 1, 1 ]
        [ 1, 1, 1, 1, 1 ]
    */
    it('should return next move (4)', function * () {
        const game = new Game([5, 5]);
        game.apple = [1, 4];
        game.snake = [[3, 4], [4, 4], [4, 3], [3, 3], [2, 3], [2, 2], [3, 2], [4, 2], [4, 1], [4, 0], [3, 0],
         [3, 1], [2, 1], [2, 0], [1, 0], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4]];

        const { nextMove } = yield getNextMove(game);
        assert.equal(nextMove, DOWN);
    });

    /*
        [ 1, 1, 1, 1, 1 ]
        [ 1, 0, 0, 2, 1 ]
        [ 1, 1, 1, 0, 1 ]
        [ 1, 1, 1, 0, 1 ]
        [ 1, 1, 1, 1, 1 ]
    */
    it('should return next move (5)', function * () {
        const game = new Game([5, 5]);
        game.apple = [1, 3];
        game.snake = [[4, 2], [4, 1], [4, 0], [3, 0], [3, 1], [3, 2], [2, 2], [2, 1], [2, 0], [1, 0], [0, 0],
         [0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [4, 3]];

        const { nextMove } = yield getNextMove(game);
        assert.equal(nextMove, LEFT);
    });

    /*
        [ 1, 1, 1, 1, 0 ]
        [ 1, 1, 1, 2, 1 ]
        [ 0, 1, 1, 0, 1 ]
        [ 0, 1, 1, 0, 1 ]
        [ 0, 0, 1, 1, 1 ]
    */
    it('should return next move (6)', function * () {
        const game = new Game([5, 5]);
        game.apple = [1, 3];
        game.snake = [[0, 3], [0, 2], [0, 1], [0, 0], [1, 0], [1, 1], [1, 2], [2, 2], [2, 1], [3, 1], [3, 2],
         [4, 2], [4, 3], [4, 4], [3, 4], [2, 4], [1, 4]];

        const { nextMove } = yield getNextMove(game);
        assert.equal(nextMove, LEFT);
    });

    /*
        [ 0, 1, 1, 1, 1 ]
        [ 1, 1, 0, 0, 1 ]
        [ 1, 1, 1, 1, 1 ]
        [ 1, 1, 0, 0, 0 ]
        [ 0, 0, 0, 0, 2 ]
    */
    it('should return next move (7)', function * () {
        const game = new Game([5, 5]);
        game.apple = [4, 4];
        game.snake = [[1, 4], [0, 4], [0, 3], [0, 2], [0, 1], [1, 1], [1, 0], [2, 0], [3, 0], [3, 1], [2, 1],
         [2, 2], [2, 3], [2, 4]];

        const { nextMove } = yield getNextMove(game);
        assert.equal(nextMove, UP);
    });

    /*
        [ 0, 0, 1, 1, 1 ]
        [ 2, 0, 1, 1, 1 ]
        [ 0, 0, 1, 1, 0 ]
        [ 0, 1, 1, 1, 0 ]
        [ 0, 1, 0, 1, 0 ]

        @TODO: In this case, there is the possibility that several apple appear in the left surface.
        If after eat the first apple a second appear at side, the snake is blocked.
    */
    it.skip('should return next move (8)', function * () {
        const game = new Game([5, 5]);
        game.apple = [1, 0];
        game.snake = [
            [4, 3], [3, 3], [2, 3], [1, 3], [1, 4], [0, 4], [0, 3], [0, 2], [1, 2], [2, 2], [3, 2],
            [3, 1], [4, 1],
        ];

        const { nextMove } = yield getNextMove(game);
        assert.equal(nextMove, RIGHT);
    });
});
