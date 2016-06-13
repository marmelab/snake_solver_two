import PathFind from '../src/js/pathFind';
import Game from '../src/js/game';

const [width, height] = [5, 5];
const apple = [4, 4];

describe('pathFind', () => {
    /*
        [ 1, 1, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 2 ]
    */
    it('should resolve path', () => {
        const snake = [[0, 1], [0, 0]];
        const grid = Game.generateGrid(width, height, snake, apple);
        const path = new PathFind(snake, apple, grid).solve();

        assert.equal(
            JSON.stringify(path),
            JSON.stringify([[1, 0], [1, 1], [1, 2], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]])
        );
    });

    it('should test collides', () => {
        const snake = [[2, 1], [2, 2], [2, 3]];
        const grid = Game.generateGrid(width, height, snake, apple);
        const pathFind = new PathFind(snake, apple, grid);
        assert.isTrue(pathFind.isCollide([2, -1]));
        assert.isTrue(pathFind.isCollide([2, 1]));
        assert.isFalse(pathFind.isCollide([0, 0]));
    });

    it('should return neighbors', () => {
        const neighbors = PathFind.neighbors([0, 0]);
        assert.equal(
            JSON.stringify(neighbors),
            JSON.stringify([[-1, 0], [0, 1], [1, 0], [0, -1]]));
    });

    it('should not resolve impossible path', () => {
        const snake = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [0, 4]];
        const grid = Game.generateGrid(width, height, snake, apple);
        const path = new PathFind(snake, apple, grid).solve();
        assert.equal(path, false);
    });
});
