import PathFind from './pathFind';

const EMPTY = 0;
const WALL = 1;
const APPLE = 2;

class Game {
    constructor(width, height, snake, apple) {
        this.width = width;
        this.height = height;
        this.snake = snake;
        this.apple = apple;
        this.actions = [];
        this.score = 0;
        this.grid = Game.generateGrid(width, height, snake, apple);
    }

    next() {
        const pathToApple = this.pathToApple();

        if (this.isPossiblePath(pathToApple)) {
            return this.goToPath(pathToApple);
        }

        const pathToTail = this.pathToTail();
        return this.goToPath(pathToTail);
    }

    virtualMove(path) {
        if (Boolean(path)) {
            path.map(move => this.moveSnake(move));
        }
    }

    goToPath(path) {
        if (!this.actions.length) {
            this.actions = path;
        }

        this.moveSnake(this.actions[0]);
        this.actions.shift();
    }

    pathToApple() {
        return new PathFind(this.snake, this.apple, this.grid).solve();
    }

    pathToTail() {
        const tail = this.snake[0];
        return new PathFind(this.snake, tail, this.grid).solve();
    }

    isPossiblePath(path) {
        if (!path) {
            return false;
        }

        const newGame = this.clone();
        newGame.virtualMove(path);
        return newGame.isPathToTailPossible(path);
    }

    isPathToTailPossible() {
        const tail = this.snake[0];
        const path = new PathFind(this.snake, tail, this.grid).solve();
        return Boolean(path) || false;
    }

    moveSnake(move) {
        this.snake.push(move);

        if (JSON.stringify(this.snake[this.snake.length - 1]) === JSON.stringify(this.apple)) {
            this.score++;
            this.random();
        } else {
            this.snake.shift();
        }

        this.grid = Game.generateGrid(this.width, this.height, this.snake, this.apple);
    }

    random() {
        const positions = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const cell = this.grid[x][y];
                if (cell === 0) {
                    positions.push([x, y]);
                }
            }
        }
        this.apple = positions[Math.floor(Math.random() * positions.length)];
    }

    clone() {
        const copy = (variable) => {
            return JSON.parse(JSON.stringify(variable));
        };

        const snake = copy(this.snake);
        const apple = copy(this.apple);
        return new Game(this.width, this.height, snake, apple);
    }

    static generateGrid(width, height, snake, apple) {
        const grid = new Array(width);
        for (let x = 0; x < width; x++) {
            grid[x] = new Array(height);
            grid[x].fill(EMPTY);

            for (let y = 0; y < height; y++) {
                const cell = [x, y];
                snake.forEach((position) => {
                    if (JSON.stringify(cell) === JSON.stringify(position)) {
                        grid[x][y] = WALL;
                    }
                });
            }
        }

        const [xApple, yApple] = apple;
        grid[xApple][yApple] = APPLE;

        return grid;
    }

    static get EMPTY() {
        return EMPTY;
    }

    static get WALL() {
        return WALL;
    }

    static get APPLE() {
        return APPLE;
    }
}

export default Game;
