import Game from '../src/game/game';
import { getBlocks, getBlock } from '../src/game/snake';

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

    describe('getBlocks()', () => {
        /*
        [ 1, 0, 1, 1, 0 ]
        [ 1, 0, 0, 1, 0 ]
        [ 1, 0, 1, 1, 0 ]
        [ 1, 1, 1, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        */
        it('should return blocks of snake', () => {
            const snake = [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [2, 2], [2, 3], [1, 3], [0, 3], [0, 2]];
            const blocks = getBlocks(snake);

            assert.equal(JSON.stringify(blocks), JSON.stringify([
                'vertical_tail_down', 'vertical', 'vertical', 'up_right', 'horizontal', 'up_left',
                'down_right', 'up_left', 'vertical', 'down_left', 'horizontal_head_right',
            ]));
        });

        /*
        [ 1, 0, 1, 1, 0 ]
        [ 1, 0, 0, 1, 0 ]
        [ 1, 0, 1, 1, 0 ]
        [ 1, 1, 1, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        */
        it('should return block of snake', () => {
            const snake = [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [2, 2], [2, 3], [1, 3], [0, 3], [0, 2]];
            const block = getBlock(snake, 2);

            assert.equal(block, 'vertical');
        });
    });
});
