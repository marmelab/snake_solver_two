import React from 'react';
import Cell from './cell';

const WALL = 1;
const APPLE = 2;

const Grid = ({ size, grid }) => {
    const [width, height] = size;
    const cells = [];

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
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
    size: React.PropTypes.array.isRequired,
    grid: React.PropTypes.array.isRequired,
};

export default Grid;
