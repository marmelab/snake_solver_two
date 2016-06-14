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

export function isSnakeHeadOutsideBoundingBox(snake, size) {
    const [width, height] = size;

    for (let i = 0; i < snake.length; i++) {
        const [xSnake, ySnake] = snake[i];
        if (xSnake >= width || ySnake >= height) {
            return true;
        }

        if (xSnake < 0 || ySnake < 0) {
            return true;
        }
    }

    return false;
}

export function getHeadSnake(snake) {
    return snake[snake.length - 1];
}
