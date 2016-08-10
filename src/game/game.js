import { moveSnake, isSnakeHeadAtPosition, getSnakeHead } from './snake';
import { isOutsideBoundingBox } from './grid';
import { findRandomApplePosition } from './apple';

export default class Game {
    constructor(size) {
        this.size = size;
        this.initialSnake = [[0, 0], [0, 1], [0, 2]];
        this.initialApple = [0, 3];
        this.init();
    }

    init() {
        const [x, y] = this.size;
        this.apple = this.initialApple.slice();
        this.snake = this.initialSnake.slice();
        this.surface = x * y;
        this.score = 0;
    }

    nextTick(nextMove) {
        this.nextMove = nextMove;
        if (nextMove === false) {
            return;
        }

        this.snake = moveSnake(this.snake, this.apple, nextMove);
        if (isSnakeHeadAtPosition(this.snake, this.apple)) {
            this.score++;
            this.apple = findRandomApplePosition(this.size, this.snake);
        }

        if (this.isWon()) {
            this.apple = '';
        }
    }

    isLost() {
        if (this.nextMove === false) {
            return true;
        }

        const snakeHead = getSnakeHead(this.snake);
        return isOutsideBoundingBox(snakeHead, this.size);
    }

    isWon() {
        return this.snake.length === this.surface;
    }
}
