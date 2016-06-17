import Game from '../src/game/game';

const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3]; // eslint-disable-line no-unused-vars

describe('snake', () => {
    /*
        [ 1, 1, 1, 2, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should move snake to the right', () => {
        const game = new Game([5, 5]);
        game.nextTick(RIGHT);

        const head = game.snake[game.snake.length - 1];
        assert.equal(JSON.stringify(head), JSON.stringify([0, 3]));
    });

    /*
        [ 1, 1, 1, 2, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should remove tail after snake move', () => {
        const game = new Game([5, 5]);
        game.nextTick(DOWN);

        assert.equal(game.snake.length, 3);
        assert.equal(JSON.stringify(game.grid[0][0]), 0);
    });
});
