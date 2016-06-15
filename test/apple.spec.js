import Game from '../src/game/game';

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

        game.nextTick([0, 3]);

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
        game.nextTick([0, 3]);
        const newSnakeSize = game.snake.length;

        assert.notEqual(snakeSize, newSnakeSize);
    });
});
