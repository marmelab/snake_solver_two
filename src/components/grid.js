import React from 'react';

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

const Cell = (props) => (<div className={props.type}></div>);
Cell.propTypes = {
    type: React.PropTypes.string,
};

const Grid = (props) => {
    const cells = [];
    const width = props.width;
    const height = props.height;
    const snake = props.snake;
    const apple = props.apple;

    const grid = generateGrid(width, height, snake, apple);

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

    return (
        <div id="grid">{cells}</div>
    );
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
