import { initializeGrid, updateGrid } from './grid';
import findRandomApplePosition from './apple';
import { moveSnakeHead, isSnakeHeadAtPosition, removeSnakeTail, isCollide } from './snake';

export default class Game {
    constructor(size) {
        this.size = size;
        this.grid = initializeGrid(size);
        this.snake = [[0, 0], [0, 1], [0, 2]];
        this.apple = [4, 4];
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

        this.grid = updateGrid(this.grid, this.snake, this.apple);

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
        const head = this.snake[this.snake.length - 1];
        return isCollide(head, this.grid);
    }

    isWon() {
        const finalScore = this.size[0] * this.size[1];
        if (this.snake.length === finalScore) {
            return true;
        }
        return false;
    }
}
