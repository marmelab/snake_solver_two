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

export function isSnakeHeadOutsideBoundingBox(snake, grid) {
    const head = snake[snake.length - 1];
    const [xHead, yHead] = head;
    if (grid[xHead][yHead] === 1) {
        return false;
    }

    return true;
}

export function getHeadSnake(snake) {
    return snake[snake.length - 1];
}
