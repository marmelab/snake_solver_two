import PathFind from '../src/js/pathFind';
import { generateGrid } from '../src/components/grid';

const width = 5;
const height = 5;
const apple = [4, 4];

describe('findPath', () => {
    it('should test collides', () => {
        const snake = [[2, 1], [2, 2], [2, 3]];
        const grid = generateGrid(width, height, snake, apple);
        const pathFind = new PathFind(snake, apple, grid);
        assert.isTrue(pathFind.isCollide([2, -1]));
        assert.isTrue(pathFind.isCollide([2, 1]));
        assert.isFalse(pathFind.isCollide([0, 0]));
    });

    it('should return neighbors', () => {
        const neighbors = PathFind.neighbors([2, 2]);
        assert.equal(JSON.stringify(neighbors[0]), JSON.stringify([1, 2]));
    });

    it('should check if path is already test', () => {
        const snake = [[2, 0], [2, 1], [2, 2]];
        const grid = generateGrid(width, height, snake, apple);
        const pathFind = new PathFind(snake, apple, grid);
        pathFind.paths = [
            [[7, 1], [5, 8], [1, 9]],
            [[2, 7], [2, 8], [2, 9]],
        ];
        assert.isTrue(pathFind.isPathAlreadyTested([[2, 7], [2, 8], [2, 9]]));
    });

    it('should resolve path', () => {
        const snake = [[2, 0], [2, 1], [2, 2]];
        const grid = generateGrid(width, height, snake, apple);
        const pathFind = new PathFind(snake, apple, grid);
        const path = pathFind.solve();

        assert.equal(
            JSON.stringify(path),
            JSON.stringify([[1, 2], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]])
        );
    });

    it.skip('should resolve other path', () => {
        const snake = [[1, 9], [2, 9], [3, 9]];
        const grid = generateGrid(10, 10, snake, apple);
        const pathFind = new PathFind(snake, apple, grid);
        const path = pathFind.solve();

        assert.equal(
            JSON.stringify(path),
            JSON.stringify([[1, 2], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]])
        );
    });
});
