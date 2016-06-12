import arrayGrid from 'array-grid';
import Game from './game';

class PathFind {

    constructor(start, end, grid) {
        this.start = start;
        this.end = end;
        this.grid = grid;

        if (start.length > 1) {
            this.snake = start;
            this.start = start[start.length - 1];
        }
    }

    isCollide(cell) {
        const MAX = arrayGrid(this.grid).shape[0];
        const MIN = 0;
        const [x, y] = cell;
        if (x < MIN || y < MIN || x >= MAX || y >= MAX) {
            return true;
        }
        if (JSON.stringify(cell) === JSON.stringify(this.start)) {
            return false;
        }
        return (this.grid[x][y] === Game.WALL) || false;
    }

    static neighbors(cell) {
        const [x, y] = cell;
        return [
            [x - 1, y], // Up
            [x, y + 1], // Right
            [x + 1, y], // Bottom
            [x, y - 1], // Left
        ];
    }

    isPathAlreadyTested(path) {
        for (let i = 0; i < this.paths.length; i++) {
            if (JSON.stringify(this.paths[i]) === JSON.stringify(path)) {
                return true;
            }
        }
        return false;
    }

    isCellAlreadyTested(cell) {
        for (let i = 0; i < this.wasHere.length; i++) {
            if (JSON.stringify(this.wasHere[i]) === JSON.stringify(cell)) {
                return true;
            }
        }
        return false;
    }

    solve() {
        this.currentPath = [];
        this.wasHere = [];
        this.paths = [];

        if (this.recursiveSolve(this.start)) {
            const path = this.currentPath;
            path.reverse();
            return path;
        }

        return false;
    }

    recursiveSolve(current) {
        if (JSON.stringify(current) === JSON.stringify(this.end)) {
            return true;
        }

        if (this.isCollide(current) || this.isCellAlreadyTested(current)) {
            return false;
        }

        this.wasHere.push(current);

        const neighbors = PathFind.neighbors(current);
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            if (this.recursiveSolve(neighbor)) {
                this.currentPath.push(neighbor);
                return true;
            }
        }

        return false;
    }

    neighbor() {
        const current = this.start;
        const neighbors = PathFind.neighbors(current);
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            if (!this.isCollide(neighbor)) {
                return [neighbor];
            }
        }
        return false;
    }
}

export default PathFind;
