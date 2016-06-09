import React from 'react';
import Cell from './cell';

const EMPTY = 0;
const WALL = 1;
const APPLE = 2;

const generateGrid = (width, height, snake, apple) => {
    const grid = new Array(width);
    for (let x = 0; x < width; x++) {
        grid[x] = new Array(height);
        grid[x].fill(EMPTY);

        for (let y = 0; y < height; y++) {
            const cell = [x, y];
            snake.forEach((position) => {
                if (JSON.stringify(cell) === JSON.stringify(position)) {
                    grid[x][y] = WALL;
                }
            });
        }
    }

    const [xApple, yApple] = apple;
    grid[xApple][yApple] = APPLE;

    return grid;
};

const Grid = ({ width, height, snake, apple }) => {
    const grid = generateGrid(width, height, snake, apple);
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
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    snake: React.PropTypes.array.isRequired,
    apple: React.PropTypes.array.isRequired,
};

export {
    Grid,
    generateGrid,
};
