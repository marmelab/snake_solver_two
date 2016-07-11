import { moveSnakeHead, removeSnakeTail, isSnakeHeadAtPosition, getHeadSnake, isSnakeFillSurface } from '../game/snake';
import { initializeGrid, getAdjacentCell, isEmptyCell, isOutsideBoundingBox } from '../game/grid';
import { isEqual } from '../js/utils';

const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];
const config = CONFIG;
const oneSecond = 1000;
let maxTick = config.maxStartTick;
let lastDiffTime;

export function getBestMove(moves, scores) {
    if (!moves.length) {
        return { bestMove: false };
    }

    const scoresSelected = [];
    scores.forEach((score, index) => {
        if (score > 0) {
            scoresSelected.push({ move: moves[index], score });
        }
    });

    scoresSelected.sort((scoreA, scoreB) => scoreB.score - scoreA.score);

    const bestMove = scoresSelected.shift();
    if (!bestMove) {
        return { bestMove: Number(moves[0]) };
    }

    return { bestMove: bestMove.move[0], bestMoveScore: bestMove.score };
}

export function getPossibleMoves(cell, grid, snake) {
    const snakeTail = snake[0];

    const possibleMove = [];
    [UP, RIGHT, DOWN, LEFT].forEach(move => {
        const adjacentCell = getAdjacentCell(move, cell);
        if (isEqual(adjacentCell, snakeTail) ||
            (!isOutsideBoundingBox(adjacentCell, grid) && isEmptyCell(adjacentCell, grid))) {
            possibleMove.push(move);
        }
    });

    return possibleMove;
}

export function getMoveScore(move, snake, apple, grid, tick) {
    const newSnake = moveSnakeHead(snake.slice(), move);
    if (isSnakeHeadAtPosition(newSnake, apple)) {
        // @FIXME: estimate freedom of movement
        if (!getPossibleMoves(apple, grid, snake).length) {
            return 0;
        }

        return (1 / tick) * 100;
    }

    return 1;
}

export function getLastMove(snake, apple) {
    const snakeHead = getHeadSnake(snake);
    return [UP, RIGHT, DOWN, LEFT].filter(move => {
        const adjacentCell = getAdjacentCell(move, snakeHead);
        if (isEqual(adjacentCell, apple)) {
            return true;
        }
        return false;
    })[0];
}

export function getNextMove(game) {
    const snake = game.snake.slice();
    const grid = game.grid.slice();
    const apple = game.apple.slice();

    if (isSnakeFillSurface(snake, game.surface)) {
        const lastMove = getLastMove(snake, apple);
        if (lastMove) {
            return { nextMove: lastMove, debug: {} };
        }
    }

    const startTime = new Date().getTime();
    const snakeHead = getHeadSnake(snake);
    const possibleMoves = getPossibleMoves(snakeHead, grid, snake);
    let scores = new Uint8Array(possibleMoves.length);
    let moves = possibleMoves.map((possibleMove, index) => {
        scores[index] = getMoveScore(possibleMove, snake, apple, grid, 1);
        return new Uint8Array([possibleMove]);
    });

    for (let tick = 1; tick <= maxTick; tick++) {
        const newMoves = [];
        let newScores = new Uint8Array([]);
        moves.forEach((move, index) => {
            let newApple = game.apple.slice();
            let newSnake = game.snake.slice();

            move.forEach(m => {
                newSnake = moveSnakeHead(newSnake, m);
                if (isSnakeHeadAtPosition(newSnake, newApple)) {
                    newApple = '';
                } else {
                    newSnake = removeSnakeTail(newSnake);
                }
            });

            const newGrid = initializeGrid(game.size, newSnake, newApple);
            const newSnakeHead = getHeadSnake(newSnake);
            getPossibleMoves(newSnakeHead, newGrid, newSnake).forEach(possibleMove => {
                const newScore = getMoveScore(possibleMove, newSnake, apple, newGrid, tick);
                newScores = new Uint8Array([...newScores, Math.max(newScore, scores[index])]);
                newMoves.push(new Uint8Array([...move, possibleMove]));
            });
        });
        if (newMoves.length && newScores.length) {
            moves = newMoves;
            scores = newScores;
        }
    }
    const endTime = new Date().getTime();
    const newDiffTime = endTime - startTime;

    if (newDiffTime > lastDiffTime || newDiffTime > oneSecond) {
        maxTick--;
    } else if (newDiffTime < lastDiffTime || newDiffTime < oneSecond) {
        maxTick++;
    }

    lastDiffTime = newDiffTime;

    const { bestMove, bestMoveScore } = getBestMove(moves, scores);

    return {
        nextMove: bestMove,
        debug: {
            moves: moves.length,
            computationTime: newDiffTime,
            bestMoveScore,
            maxTick,
        },
    };
}
