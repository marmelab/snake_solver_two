import arrayGrid from 'array-grid';

const WALL = 1;

class PathFind {

    constructor(start, end, grid) {
        this.start = start;
        this.end = end;
        this.grid = grid;
        this.currentPath = [];
        this.wasHere = [];
        this.paths = [];
    }

    isCollide(cell) {
        const MAX = arrayGrid(this.grid).shape[0];
        const MIN = 0;
        const [x, y] = cell;
        if (x < MIN || y < MIN || x >= MAX || y >= MAX) {
            return true;
        }
        return (this.grid[x][y] === WALL) || false;
    }

    neighbors(cell) {
        const [x, y] = cell;
        return [
            [x - 1, y], // Up
            [x, y + 1], // Right
            [x + 1, y], // Bottom
            [x, y - 1], // Left
        ];
    }

    pathAlreadyTest(path) {
        for (let i = 0; i < this.paths.length; i++) {
            if (JSON.stringify(this.paths[i]) === JSON.stringify(path)) {
                return true;
            }
        }
        return false;
    }

    cellAlreadyTest(cell) {
        for (let i = 0; i < this.wasHere.length; i++) {
            if (JSON.stringify(this.wasHere[i]) === JSON.stringify(cell)) {
                return true;
            }
        }
        return false;
    }

    solve() {
        const path = this.recursiveSolve(this.start);
        this.currentPath = [];
        this.wasHere = [];

        return path;
    }

    recursiveSolve(current) {
        this.wasHere.push(current);
        this.currentPath.push(current);

        if (JSON.stringify(current) === JSON.stringify(this.end)) {
            this.currentPath.shift();
            return this.currentPath;
        }

        const neighbors = this.neighbors(current);
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            if (!this.isCollide(neighbor) && !this.cellAlreadyTest(neighbor)) {
                return this.recursiveSolve(neighbor);
            }
        }

        return false;
    }
}

export default PathFind;
