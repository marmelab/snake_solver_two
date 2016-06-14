import Game from '../src/game/game';

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
        game.nextTick([0, 3]);

        const head = game.snake[game.snake.length - 1];
        assert.equal(JSON.stringify(head), JSON.stringify([0, 3]));
    });
});
