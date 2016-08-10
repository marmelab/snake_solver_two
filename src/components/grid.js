import React from 'react';
import Cell from './cell';
import { getBlock } from '../game/snake';
import { isEqual } from '../js/utils';

const Grid = ({ size, snake, apple, message }) => {
    const [MAX_WIDTH, MAX_HEIGHT] = size;
    const cells = [];

    for (let x = 0; x < MAX_WIDTH; x++) {
        for (let y = 0; y < MAX_HEIGHT; y++) {
            let cell = false;

            if (isEqual(apple, [x, y])) {
                cells.push(<Cell type="apple" />);
                continue;
            }

            snake.forEach((snakeBlock, index) => {
                if (isEqual(snakeBlock, [x, y])) {
                    cell = true;
                    cells.push(<Cell type={`snake ${getBlock(snake, index)}`} />);
                }
            });

            if (!cell) {
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
    size: React.PropTypes.array.isRequired,
    snake: React.PropTypes.array.isRequired,
    apple: React.PropTypes.array.isRequired,
    message: React.PropTypes.object,
};

export default Grid;
