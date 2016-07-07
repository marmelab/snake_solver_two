import { initializeGrid } from './grid';
import findRandomApplePosition from './apple';
import { moveSnakeHead, isSnakeHeadAtPosition, removeSnakeTail, isCollide } from './snake';

export default class Game {
    constructor(size) {
        const [x, y] = size;
        this.size = size;
        this.snake = [[0, 0], [0, 1], [0, 2]];
        this.apple = [0, 3];
        this.grid = initializeGrid(size, this.snake, this.apple);
        this.surface = x * y;
        this.score = 0;
    }

    nextTick(nextMove) {
        const newSnake = moveSnakeHead(this.snake, nextMove);
        if (isSnakeHeadAtPosition(newSnake, this.apple)) {
            this.score++;
            this.snake = newSnake;
            this.apple = findRandomApplePosition(this.grid);
        } else {
            this.snake = removeSnakeTail(newSnake);
        }

        if (this.isLost()) {
            throw new Error('You lose :(');
        }

        if (this.isWon()) {
            this.apple = '';
            this.grid = initializeGrid(this.size, this.snake, this.apple);
            throw new Error('You win !');
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
        const head = this.snake[this.snake.length - 1];
        return isCollide(head, this.grid);
    }

    isWon() {
        return this.snake.length === this.surface;
    }
}
