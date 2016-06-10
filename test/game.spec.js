import Game from '../src/js/game';
import PathFind from '../src/js/pathFind';

const EMPTY = 0;
const WALL = 1;
const APPLE = 2;

describe('game', () => {
    /*
    [ [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 1, 1, 1, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 2 ] ]
    */
    it('should generate grid', () => {
        const width = 5;
        const height = 5;
        const apple = [4, 4];
        const snake = [[2, 0], [2, 1], [2, 2]];
        const grid = Game.generateGrid(width, height, snake, apple);
        assert.equal(grid[0][1], EMPTY);
        assert.equal(grid[2][2], WALL);
        assert.equal(grid[4][4], APPLE);
    });

    /*
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 1, 1, 1, 0, 0 ]
        [ 1, 1, 1, 0, 0 ]
        [ 1, 0, 0, 0, 2 ]
    */
    it('should move snake to the right', () => {
        const width = 5;
        const height = 5;
        const apple = [4, 4];
        const snake = [[3, 1], [3, 2], [2, 2], [2, 1], [2, 0], [3, 0], [4, 0]];
        const grid = Game.generateGrid(width, height, snake, apple);
        const path = new PathFind(snake, apple, grid).solve();
        assert.equal(JSON.stringify(path[0]), JSON.stringify([4, 1]));
    });

    /*
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 2, 0 ]
        [ 1, 1, 1, 1, 0 ]
    */
    it('should generate apple random position after eat', () => {
        const width = 5;
        const height = 5;
        const apple = [3, 3];
        const snake = [[4, 0], [4, 1], [4, 2], [4, 3]];

        const game = new Game(width, height, snake, apple);
        game.moveSnake();

        const newApple = game.apple;
        assert.notEqual(JSON.stringify(newApple), JSON.stringify(apple));
    });

    /*
        [ 0, 0, 0, 0, 2 ]
        [ 1, 0, 0, 0, 0 ]
        [ 1, 0, 0, 0, 0 ]
        [ 1, 1, 1, 1, 1 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should not enter in closed zone', () => {
        const width = 5;
        const height = 5;
        const apple = [4, 4];
        const snake = [[1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4]];

        const game = new Game(width, height, snake, apple);
        game.moveSnake();

        const headSnake = game.snake[game.snake.length - 1];
        assert.notEqual(JSON.stringify(headSnake), JSON.stringify([4, 4]));
    });
});
