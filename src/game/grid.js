const BLOCK = 1;
const APPLE = 2;
const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];

export function initializeGrid([width, height], snake, [xApple, yApple]) {
    const grid = new Array(width);
    for (let x = 0; x < width; x++) {
        grid[x] = new Array(height);
        grid[x].fill(0);
        for (let y = 0; y < height; y++) {
            grid[x][y] = 0;
        }
    }

    snake.forEach(([xSnake, ySnake]) => {
        grid[xSnake][ySnake] = BLOCK;
    });

    if (!isNaN(xApple) && !isNaN(yApple)) {
        grid[xApple][yApple] = APPLE;
    }

    // return Array(height).fill(Array(width).fill(0)); // @FIXME
    return grid;
}

export function getAdjacentCell(move, [x, y]) {
    switch (move) {
    case UP:
        return [x - 1, y];
    case RIGHT:
        return [x, y + 1];
    case DOWN:
        return [x + 1, y];
    case LEFT:
        return [x, y - 1];
    default:
        return false;
    }
}
