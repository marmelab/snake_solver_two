import Game from '../src/js/game';

const EMPTY = 0;
const WALL = 1;
const APPLE = 2;

const width = 5;
const height = 5;

describe('game', () => {
    /*
    [ [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 1, 1, 1, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 2 ] ]
    */
    it('should generate grid', () => {
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
        const snake = [[3, 1], [3, 2], [2, 2], [2, 1], [2, 0], [3, 0], [4, 0]];
        const apple = [4, 4];
        const game = new Game(width, height, snake, apple);
        game.next();
        const head = snake[snake.length - 1];
        assert.equal(JSON.stringify(head), JSON.stringify([4, 1]));
    });

    /*
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 2, 0 ]
        [ 1, 1, 1, 1, 0 ]
    */
    it('should generate apple random position after eat', () => {
        const apple = [3, 3];
        const snake = [[4, 0], [4, 1], [4, 2], [4, 3]];
        const game = new Game(width, height, snake, apple);
        game.moveSnake(apple);
        const newApple = game.apple;
        assert.notEqual(JSON.stringify(newApple), JSON.stringify(apple));
    });

    /*
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 2, 0 ]
        [ 1, 1, 1, 1, 0 ]
    */
    it('should expand snake after eat apple', () => {
        const apple = [3, 3];
        const snake = [[4, 0], [4, 1], [4, 2], [4, 3]];
        const snakeSize = snake.length;
        const game = new Game(width, height, snake, apple);
        game.moveSnake(apple);
        const newSnakeSize = game.snake.length;
        assert.notEqual(snakeSize, newSnakeSize);
    });

    /*
        [ 1, 1, 0, 0, 2 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should return path to apple', () => {
        const apple = [0, 4];
        const snake = [[0, 0], [0, 1]];
        const game = new Game(width, height, snake, apple);
        const pathToApple = game.pathToApple();
        assert.equal(JSON.stringify(pathToApple), JSON.stringify([[0, 2], [0, 3], [0, 4]]));
    });

    /*
        [ 1, 1, 1, 0, 2 ]
        [ 0, 0, 1, 0, 0 ]
        [ 0, 0, 1, 0, 0 ]
        [ 0, 0, 1, 0, 0 ]
        [ 0, 0, 1, 0, 0 ]
    */
    it('should check if path to tail is possible', () => {
        const apple = [0, 4];
        const snake = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]];
        const game = new Game(width, height, snake, apple);
        assert.isTrue(game.isPathToTailPossible());
        game.snake.push([4, 3]);
        assert.isFalse(game.isPathToTailPossible());
    });

    /*
        [ 1, 1, 1, 0, 0 ]
        [ 0, 0, 1, 0, 0 ]
        [ 0, 1, 1, 0, 0 ]
        [ 0, 1, 1, 0, 0 ]
        [ 0, 0, 1, 0, 2 ]
    */
    it('should return path to tail', () => {
        const apple = [4, 4];
        const snake = [[4, 2], [3, 2], [3, 1], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1], [0, 0]];
        const game = new Game(width, height, snake, apple);
        const pathToTail = game.pathToTail();
        assert.equal(JSON.stringify(pathToTail), JSON.stringify(
            [[1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2]]
        ));
    });

    /*
        [ 1, 1, 1, 0, 2 ]
        [ 0, 0, 1, 0, 0 ]
        [ 0, 0, 1, 0, 0 ]
        [ 0, 0, 1, 0, 0 ]
        [ 0, 0, 1, 0, 0 ]
    */
    it('should test if after eat apple, move to tail is not possible', () => {
        const apple = [0, 4];
        const snake = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]];
        const game = new Game(width, height, snake, apple);
        const pathToApple = game.pathToApple();
        const newGame = game.clone();
        newGame.virtualMove(pathToApple);
        assert.isFalse(newGame.isPathToTailPossible());
    });

    /*
        [ 1, 1, 0, 2, 0 ]
        [ 1, 1, 0, 0, 0 ]
        [ 1, 0, 0, 0, 0 ]
        [ 1, 1, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it.skip('should test if after eat apple, move to tail is possible', () => {
        const apple = [0, 3];
        const snake = [[1, 1], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [3, 1]];
        const game = new Game(width, height, snake, apple);
        const pathToApple = game.pathToApple();
        const newGame = game.clone();
        newGame.virtualMove(pathToApple);
        assert.isTrue(newGame.isPathToTailPossible());
    });
});
