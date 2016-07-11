const EMPTY = 0;

export function findRandomApplePosition(grid) {
    const MAX_WIDTH = grid[0].length;
    const MAX_HEIGHT = grid.length;

    const positions = [];
    for (let x = 0; x < MAX_WIDTH; x++) {
        for (let y = 0; y < MAX_HEIGHT; y++) {
            const cell = grid[x][y];
            if (cell === EMPTY) {
                positions.push([x, y]);
            }
        }
    }

    return positions[Math.floor(Math.random() * positions.length)];
}
