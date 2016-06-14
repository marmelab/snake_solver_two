import { moveSnakeHead, isSnakeHeadAtPosition, isCollide } from '../game/snake';

const MAX_TICK = 15;

export function getNeighbors([x, y]) {
    return [
        [x - 1, y], // Up
        [x, y + 1], // Right
        [x + 1, y], // Down
        [x, y - 1], // Left
    ];
}

export function getPossibleMoves(cell, grid) {
    return getNeighbors(cell).filter(([xNeighbor, yNeighbor]) => {
        if (!isCollide([xNeighbor, yNeighbor], grid) && grid[xNeighbor][yNeighbor] === 0) {
            return true;
        }
        return false;
    });
}

export function getBestMove(movesScores) {
    // ...
    return [0, 3];
}

export function getMoveScore(move, snake, apple, grid) {
    const newSnake = moveSnakeHead(snake, move);
    const headNewSnake = newSnake[newSnake.length - 1];

    if (isSnakeHeadAtPosition(newSnake, apple)) {
        // @FIXME: estimate freedom of movement
        return 1;
    }
    if (isCollide(headNewSnake, grid)) {
        return -1;
    }
    return 0;
}

export function getNextMove(game) {
    const head = game.snake[game.snake.length - 1];
    const possibleMoves = getPossibleMoves(head, game.grid);
    const movesScores = [];
    for (let tick = 0; tick < MAX_TICK; tick++) {
        possibleMoves.forEach(move => {
            const moveScore = getMoveScore(move, game.snake, game.apple, game.grid);
            movesScores.push({ moves: [move], score: moveScore });
        });
    }

    return getBestMove(movesScores);
}
