import React from 'react';
import Cell from './cell';
import Game from '../js/game';

const Grid = ({ width, height, snake, apple }) => {
    const grid = Game.generateGrid(width, height, snake, apple);
    const head = snake[snake.length - 1];
    const cells = [];

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cell = grid[x][y];

            if (JSON.stringify([x, y]) === JSON.stringify(head)) {
                cells.push(<Cell type="head" />);
                continue;
            }

            switch (cell) {
            case Game.WALL:
                cells.push(<Cell type="snake" />);
                break;
            case Game.APPLE:
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
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    snake: React.PropTypes.array.isRequired,
    apple: React.PropTypes.array.isRequired,
};

export default Grid;
