const BLOCK = 1;
const APPLE = 2;
const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];

export function initializeGrid([width, height], snake, [xApple, yApple]) {
    let x;
    let l;
    const grid = new Array(width);
    for (x = 0; x < width; ++x) {
        grid[x] = (new Uint8Array(height)).fill(0);
    }

    for (x = 0, l = snake.length; x < l; ++x) {
        grid[snake[x][0]][snake[x][1]] = BLOCK;
    }

    if (!isNaN(xApple) && !isNaN(yApple)) {
        grid[xApple][yApple] = APPLE;
    }

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

export function isEmptyCell([xCell, yCell], grid) {
    return grid[xCell][yCell] !== BLOCK;
}

export function isOutsideBoundingBox([xCell, yCell], grid) {
    const MAX_WIDTH = grid[0].length;
    const MAX_HEIGHT = grid.length;
    if (xCell >= MAX_WIDTH || yCell >= MAX_HEIGHT || xCell < 0 || yCell < 0) {
        return true;
    }

    return false;
}
