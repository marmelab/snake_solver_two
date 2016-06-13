export default function initializeGrid(size) {
    const [width, height] = size;
    const grid = new Array(width);

    for (let x = 0; x < width; x++) {
        grid[x] = new Array(height);
        grid[x].fill(0);

        for (let y = 0; y < height; y++) {
            grid[x][y] = 0;
        }
    }

    return grid;
}
