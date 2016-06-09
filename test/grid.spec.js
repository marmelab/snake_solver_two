import { generateGrid } from '../src/components/grid';

const EMPTY = 0;
const WALL = 1;
const APPLE = 2;

describe('grid', () => {
    it('should generate grid', () => {
        const width = 5;
        const height = 5;
        const apple = [4, 4];
        const snake = [[2, 0], [2, 1], [2, 2]];

        const grid = generateGrid(width, height, snake, apple);
        /*
        [ [ 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0 ],
          [ 1, 1, 1, 0, 0 ],
          [ 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 2 ] ]
        */

        assert.equal(grid[0][1], EMPTY);
        assert.equal(grid[2][2], WALL);
        assert.equal(grid[4][4], APPLE);
    });
});
