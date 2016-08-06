import { getAdjacentCell } from './grid';
import { isEqual } from '../js/utils';

const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];

export function getSnakeHead(snake) {
    return snake[snake.length - 1];
}

export function getSnakeTail(snake) {
    return snake[0];
}

export function isSnakeHeadAtPosition(snake, position) {
    const head = getSnakeHead(snake);
    return isEqual(head, position);
}

export function moveSnake(snake, apple, move) {
    const snakeHead = getSnakeHead(snake);
    snake.push(getAdjacentCell(move, snakeHead));

    if (!isSnakeHeadAtPosition(snake, apple)) {
        snake.shift();
    }

    return snake;
}

export function isSnakeFillSurface(snake, surface) {
    return snake.length === surface - 1;
}

export function getDirection(position, target) {
    return [UP, RIGHT, DOWN, LEFT].filter(move => (isEqual(target, getAdjacentCell(move, position))))[0];
}

export function getBlock(snake, index) {
    const prevPosition = getDirection(snake[index], snake[index - 1]);
    const nextPosition = getDirection(snake[index], snake[index + 1]);

    if (index === 0) {
        if (nextPosition === LEFT) {
            return 'horizontal_tail_left';
        }
        if (nextPosition === RIGHT) {
            return 'horizontal_tail_right';
        }
        if (nextPosition === UP) {
            return 'vertical_tail_up';
        }
        if (nextPosition === DOWN) {
            return 'vertical_tail_down';
        }
    }

    if (index === snake.length - 1) {
        if (prevPosition === LEFT) {
            return 'horizontal_head_left';
        }
        if (prevPosition === RIGHT) {
            return 'horizontal_head_right';
        }
        if (prevPosition === UP) {
            return 'vertical_head_up';
        }
        if (prevPosition === DOWN) {
            return 'vertical_head_down';
        }
    }

    if ((prevPosition === LEFT && nextPosition === RIGHT) || (prevPosition === RIGHT && nextPosition === LEFT)) {
        return 'horizontal';
    }

    if ((prevPosition === UP && nextPosition === DOWN) || (prevPosition === DOWN && nextPosition === UP)) {
        return 'vertical';
    }

    if ((prevPosition === UP && nextPosition === RIGHT) || (prevPosition === RIGHT && nextPosition === UP)) {
        return 'up_right';
    }

    if ((prevPosition === UP && nextPosition === LEFT) || (prevPosition === LEFT && nextPosition === UP)) {
        return 'up_left';
    }

    if ((prevPosition === DOWN && nextPosition === RIGHT) || prevPosition === RIGHT && nextPosition === DOWN) {
        return 'down_right';
    }

    if ((prevPosition === DOWN && nextPosition === LEFT) || (prevPosition === LEFT && nextPosition === DOWN)) {
        return 'down_left';
    }

    return false;
}

export function getBlocks(snake) {
    return snake.map((block, index) => getBlock(snake, index));
}
