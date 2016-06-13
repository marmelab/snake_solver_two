import initializeGrid from './initializeGrid';
import findRandomApplePosition from './apple';
import { moveSnakeHead, isSnakeHeadAtPosition, removeSnakeTail, isSnakeHeadOutsideBoundingBox } from './snake';

export default class Game {
    constructor(size) {
        this.size = size;
        this.grid = initializeGrid(size);
        this.snake = [[0, 0], [0, 1], [0, 2]];
        this.apple = findRandomApplePosition(this.grid, this.snake);
        this.score = 0;
    }

    nextTick(nextMove) {
        const newSnake = moveSnakeHead(this.snake, nextMove);
        if (isSnakeHeadAtPosition(newSnake, this.apple)) {
            this.snake = newSnake;
            this.apple = findRandomApplePosition(this.grid, this.snake);
        } else {
            this.snake = removeSnakeTail(newSnake);
        }

        if (this.isLost()) {
            throw new Error('You lose :(');
        }

        if (this.isWon()) {
            throw new Error('You win !');
        }
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
        if (isSnakeHeadOutsideBoundingBox(this.snake, this.grid)) {
            return false;
        }

        return true;
    }

    isWon() {
        const finalScore = this.size.reduce((width, height) => width * height);
        if (this.snake.length === finalScore) {
            return true;
        }
        return false;
    }
}
