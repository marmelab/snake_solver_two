import React from 'react';
import Cell from './cell';
import { getBlock } from '../game/snake';
import { isEqual } from '../js/utils';

const BLOCK = 1;
const APPLE = 2;

const gridStyle = {
    width: 250,
    height: 250,
};

const Grid = ({ grid, snake }) => {
    const MAX_WIDTH = grid[0].length;
    const MAX_HEIGHT = grid.length;
    const cells = [];

    for (let x = 0; x < MAX_WIDTH; x++) {
        for (let y = 0; y < MAX_HEIGHT; y++) {
            const cell = grid[x][y];

            snake.forEach((snakeBlock, index) => {
                if (isEqual(snakeBlock, [x, y])) {
                    const block = getBlock(snake, index);
                    cells.push(<Cell type={block} />);
                }
            });

            switch (cell) {
            case BLOCK:
                break;
            case APPLE:
                cells.push(<Cell type="apple" />);
                break;
            default:
                cells.push(<Cell />);
            }
        }
    }

    return <div id="grid" style={gridStyle}>{cells}</div>;
};

Grid.propTypes = {
    grid: React.PropTypes.array.isRequired,
    snake: React.PropTypes.array.isRequired,
};

export default Grid;
