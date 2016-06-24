import { getAdjacentCell } from './grid';
import { isEqual } from '../js/utils';

export function getHeadSnake(snake) {
    return snake[snake.length - 1];
}

export function moveSnakeHead(snake, nextMove) {
    const head = getHeadSnake(snake);
    const newHead = getAdjacentCell(nextMove, head);
    snake.push(newHead);
    return snake;
}

export function removeSnakeTail(snake) {
    snake.shift();
    return snake;
}

export function isSnakeHeadAtPosition(snake, position) {
    const head = getHeadSnake(snake);
    return isEqual(head, position);
}

export function isCollide([xCell, yCell], grid) {
    const MAX_WIDTH = grid[0].length;
    const MAX_HEIGHT = grid.length;
    if (xCell >= MAX_WIDTH || yCell >= MAX_HEIGHT || xCell < 0 || yCell < 0) {
        return true;
    }

    return false;
}
