import { isCollide } from '../game/snake';

export function getNeighbors(cell) {
    const [x, y] = cell;
    return [
        [x - 1, y], // Up
        [x, y + 1], // Right
        [x + 1, y], // Down
        [x, y - 1], // Left
    ];
}

export function getPossibleMoves(cell, grid) {
    const neighbors = getNeighbors(cell);
    return neighbors.filter(neighbor => {
        const [xNeighbor, yNeighbor] = neighbor;
        if (!isCollide(neighbor, grid) && grid[xNeighbor][yNeighbor] === 0) {
            return true;
        }
        return false;
    });
}

export default function getNextMove(game) {
    const head = game.snake[game.snake.length - 1];
    const possibleMoves = getPossibleMoves(head, game.grid);
    return [0, 3];
}
