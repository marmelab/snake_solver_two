export default function findRandomApplePosition(grid) {
    const positions = [];
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            const cell = grid[x][y];
            if (cell === 0) {
                positions.push([x, y]);
            }
        }
    }

    return positions[Math.floor(Math.random() * positions.length)];
}
