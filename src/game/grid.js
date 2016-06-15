const BLOCK = 1;
const APPLE = 2;

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

    grid[xApple][yApple] = APPLE;

    // return Array(height).fill(Array(width).fill(0)); // @FIXME
    return grid;
}
