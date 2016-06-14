import React from 'react';
import Cell from './cell';

const WALL = 1;
const APPLE = 2;

const Grid = ({ grid }) => {
    const MAX_WIDTH = grid[0].length;
    const MAX_HEIGHT = grid.length;
    const cells = [];

    for (let x = 0; x < MAX_WIDTH; x++) {
        for (let y = 0; y < MAX_HEIGHT; y++) {
            const cell = grid[x][y];

            switch (cell) {
            case WALL:
                cells.push(<Cell type="snake" />);
                break;
            case APPLE:
                cells.push(<Cell type="apple" />);
                break;
            default:
                cells.push(<Cell />);
            }
        }
    }

    return <div id="grid">{cells}</div>;
};

Grid.propTypes = {
    grid: React.PropTypes.array.isRequired,
};

export default Grid;
