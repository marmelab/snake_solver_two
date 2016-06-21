import { initializeGrid } from '../src/game/grid';

describe('grid', () => {
    /*
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
        [ 0, 0, 0, 0, 0 ]
    */
    it('should initialize grid', () => {
        const size = [5, 5];
        const snake = [[0, 0], [0, 1], [0, 2]];
        const apple = [2, 2];

        const grid = initializeGrid(size, snake, apple);
        assert.equal(grid[0][0], 1);
        assert.equal(grid[2][2], 2);
        assert.equal(grid[4][4], 0);
    });
});
