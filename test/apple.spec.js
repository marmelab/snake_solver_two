import Game from '../src/game/game';

const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3]; // eslint-disable-line no-unused-vars

describe('apple', () => {
    /*
        [ 1, 1, 1, 2, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should generate apple random position after eat', () => {
        const game = new Game([5, 5]);
        const apple = game.apple.slice();

        game.nextTick(RIGHT);

        const newApple = game.getApple();
        assert.notEqual(JSON.stringify(apple), JSON.stringify(newApple));
    });

    /*
        [ 1, 1, 1, 2, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should expand snake after eat apple', () => {
        const game = new Game([5, 5]);
        const apple = [0, 3];
        const snakeSize = game.snake.length;

        game.apple = apple;
        game.nextTick(RIGHT);
        const newSnakeSize = game.snake.length;

        assert.notEqual(snakeSize, newSnakeSize);
    });
});
