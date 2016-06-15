export function moveSnakeHead(snake, nextMove) {
    snake.push(nextMove);
    return snake;
}

export function removeSnakeTail(snake) {
    snake.shift();
    return snake;
}

export function isSnakeHeadAtPosition(snake, position) {
    const head = snake[snake.length - 1];
    return (JSON.stringify(head) === JSON.stringify(position)) || false;
}

export function isCollide([xCell, yCell], grid) {
    const MAX_WIDTH = grid[0].length;
    const MAX_HEIGHT = grid.length;
    if (xCell >= MAX_WIDTH || yCell >= MAX_HEIGHT || xCell < 0 || yCell < 0) {
        return true;
    }

    return false;
}

export function getHeadSnake(snake) {
    return snake[snake.length - 1];
}
