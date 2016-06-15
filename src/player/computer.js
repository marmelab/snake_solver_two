import { moveSnakeHead, isSnakeHeadAtPosition, isCollide } from '../game/snake';

const MAX_TICK = 2;

export function getNeighbors([x, y]) {
    return [
        [x - 1, y], // Up
        [x, y + 1], // Right
        [x + 1, y], // Down
        [x, y - 1], // Left
    ];
}

export function getBestMove(movesScores) {
    const sortedMoves = movesScores.sort((moveScoreA, moveScoreB) => moveScoreB.score - moveScoreA.score);
    return sortedMoves[0].moves[0];
}

export function getPossibleMoves(cell, grid) {
    return getNeighbors(cell).filter(([xNeighbor, yNeighbor]) => {
        if (!isCollide([xNeighbor, yNeighbor], grid) && grid[xNeighbor][yNeighbor] === 0) {
            return true;
        }
        return false;
    });
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
    const snake = game.snake.slice();
    const apple = game.apple.slice();
    const grid = game.grid.slice();

    const head = snake[snake.length - 1];
    const possibleMoves = getPossibleMoves(head, grid);
    const movesScores = [];

    possibleMoves.forEach(move => {
        const score = getMoveScore(move, snake, apple, grid);
        movesScores.push({ moves: [move], score });
    });

    for (let tick = 0; tick < MAX_TICK; tick++) {
        movesScores.forEach(({ moves, score }) => {
            const move = moves[moves.length - 1];
            getPossibleMoves(move, grid).forEach(possibleMove => {
                const newScore = getMoveScore(possibleMove, snake, apple, grid);
                const newMoves = moves.slice();
                newMoves.push(possibleMove);
                movesScores.push({ moves: newMoves, score: score + newScore });
            });
        });
    }

    return getBestMove(movesScores);
}
