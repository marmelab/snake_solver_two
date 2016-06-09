import PathFind from '../src/js/pathFind';
import { generateGrid } from '../src/components/grid';

const width = 5;
const height = 5;
const apple = [2, 4];
const snake = [[2, 0], [2, 1], [2, 2]];
const head = snake[snake.length - 1];

const grid = generateGrid(width, height, snake, apple);
/*
[ [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 1, 1, 1, 0, 2 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ] ]
*/

describe('findPath', () => {
    it('should test collides', () => {
        const pathFind = new PathFind(head, apple, grid);
        assert.isTrue(pathFind.isCollide([2, -1]));
        assert.isTrue(pathFind.isCollide([2, 1]));
        assert.isFalse(pathFind.isCollide([0, 0]));
    });

    it('should return neighbors', () => {
        const pathFind = new PathFind(head, apple, grid);
        const neighbors = pathFind.neighbors(head);
        assert.equal(JSON.stringify(neighbors[0]), JSON.stringify([1, 2]));
    });

    it('should check if path is already test', () => {
        const pathFind = new PathFind(head, apple, grid);
        pathFind.paths = [
            [[7, 1], [5, 8], [1, 9]],
            [[2, 7], [2, 8], [2, 9]],
        ];
        assert.isTrue(pathFind.pathAlreadyTest([[2, 7], [2, 8], [2, 9]]));
    });

    it('should resolve path', () => {
        const pathFind = new PathFind(head, apple, grid);
        pathFind.solve();
    });
});
