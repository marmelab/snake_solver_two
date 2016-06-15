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
        const grid = initializeGrid([5, 5]);
        assert.equal(grid[0][0], 0);
        assert.equal(grid[4][4], 0);
    });
});
