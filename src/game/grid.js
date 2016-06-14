const BLOCK = 1;
const APPLE = 2;

export function initializeGrid([width, height]) {
    return Array(height).fill(Array(width).fill(0));
}

export function updateGrid(grid, snake, [xApple, yApple]) {
    snake.forEach(([xSnake, ySnake]) => {
        grid[xSnake][ySnake] = BLOCK;
    });

    grid[xApple][yApple] = APPLE;

    return grid;
}
