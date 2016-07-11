import React from 'react';
import Cell from './cell';
import { getBlock } from '../game/snake';
import { isEqual } from '../js/utils';

const BLOCK = 1;
const APPLE = 2;

const Grid = ({ grid, snake, message }) => {
    const MAX_WIDTH = grid[0].length;
    const MAX_HEIGHT = grid.length;
    const cells = [];

    for (let x = 0; x < MAX_WIDTH; x++) {
        for (let y = 0; y < MAX_HEIGHT; y++) {
            const cell = grid[x][y];

            snake.forEach((snakeBlock, index) => {
                if (isEqual(snakeBlock, [x, y])) {
                    const block = getBlock(snake, index);
                    cells.push(<Cell type={`snake ${block}`} />);
                }
            });

            switch (cell) {
            case BLOCK:
                break;
            case APPLE:
                cells.push(<Cell type="apple" />);
                break;
            default:
                cells.push(<Cell type="empty" />);
            }
        }
    }

    const config = CONFIG;
    const gridStyle = {
        width: config.cellSize * MAX_WIDTH,
        height: config.cellSize * MAX_HEIGHT,
    };

    return (
        <div className="grid" style={gridStyle}>
            {message}
            {cells}
        </div>
    );
};

Grid.propTypes = {
    grid: React.PropTypes.array.isRequired,
    snake: React.PropTypes.array.isRequired,
};

export default Grid;
