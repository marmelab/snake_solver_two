import { moveSnakeHead, isSnakeHeadAtPosition, removeSnakeTail, getHeadSnake } from './snake';
import { initializeGrid, isOutsideBoundingBox } from './grid';
import { findRandomApplePosition } from './apple';

export default class Game {
    constructor(size) {
        this.size = size;
        this.init();
    }

    init() {
        const [x, y] = this.size;
        this.apple = [0, 3];
        this.snake = [[0, 0], [0, 1], [0, 2]];
        this.grid = initializeGrid(this.size, this.snake, this.apple);
        this.surface = x * y;
        this.score = 0;
    }

    nextTick(nextMove) {
        this.nextMove = nextMove;
        if (nextMove === false) {
            return;
        }

        const newSnake = moveSnakeHead(this.snake, nextMove);
        if (isSnakeHeadAtPosition(newSnake, this.apple)) {
            this.score++;
            this.snake = newSnake;
            this.apple = findRandomApplePosition(this.grid);
        } else {
            this.snake = removeSnakeTail(newSnake);
        }

        if (this.isWon()) {
            this.apple = '';
        }

        this.grid = initializeGrid(this.size, this.snake, this.apple);
    }

    getSnake() {
        return this.snake;
    }

    getGrid() {
        return this.grid;
    }

    getApple() {
        return this.apple;
    }

    isLost() {
        if (this.nextMove === false) {
            return true;
        }

        return isOutsideBoundingBox(getHeadSnake(this.snake), this.grid);
    }

    isWon() {
        return this.snake.length === this.surface;
    }
}
