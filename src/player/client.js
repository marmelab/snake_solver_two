import { moveSnake, isSnakeHeadAtPosition, getSnakeHead, getSnakeTail, isSnakeFillSurface } from '../game/snake';
import { getAdjacentCell, isEmptyCell, isOutsideBoundingBox } from '../game/grid';
import { isEqual } from '../js/utils';

const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];
const config = CONFIG;
const oneSecond = 1000;
let maxTick = config.maxStartTick;
let lastDiffTime;

export function getBestMove(moves, scores) {
    const scoresSelected = [];
    scores.forEach((score, index) => {
        if (score > 0) {
            scoresSelected.push({ move: moves[index], score });
        }
    });

    scoresSelected.sort((scoreA, scoreB) => scoreB.score - scoreA.score);
    return scoresSelected.shift();
}

export function getPossibleMoves(snake, size) {
    const snakeHead = getSnakeHead(snake);
    const snakeTail = getSnakeTail(snake);

    const possibleMove = [];
    [UP, RIGHT, DOWN, LEFT].forEach(move => {
        const adjacentCell = getAdjacentCell(move, snakeHead);
        if (isEqual(adjacentCell, snakeTail) ||
            (!isOutsideBoundingBox(adjacentCell, size) && isEmptyCell(adjacentCell, snake))) {
            possibleMove.push(move);
        }
    });

    return possibleMove;
}

export function isSnakeHasFreeSpace(snake, size) {
    return !!getPossibleMoves(snake, size).length;
}

export function getMoveScore(size, move, snake, apple, tick) {
    const newSnake = moveSnake(snake.slice(), apple, move);

    if (isSnakeHeadAtPosition(newSnake, apple)) {
        // @FIXME: estimate freedom of movement
        if (!isSnakeHasFreeSpace(snake, size)) {
            return 0;
        }

        return (1 / tick) * 100;
    }

    return 1;
}

export function getLastMove(snake, apple) {
    const snakeHead = getSnakeHead(snake);
    return [UP, RIGHT, DOWN, LEFT].filter(move => {
        const adjacentCell = getAdjacentCell(move, snakeHead);
        if (isEqual(adjacentCell, apple)) {
            return true;
        }
        return false;
    })[0];
}

export function * getNextMove(game) {
    const snake = game.snake.slice();
    const apple = game.apple.slice();

    if (isEqual(snake, game.initialSnake)) {
        maxTick = config.maxStartTick;
    }

    if (isSnakeFillSurface(snake, game.surface)) {
        const lastMove = getLastMove(snake, apple);
        if (lastMove) {
            return { nextMove: lastMove, debug: {} };
        }
    }

    const startTime = new Date().getTime();
    const possibleMoves = getPossibleMoves(snake, game.size);
    let scores = new Uint8Array(possibleMoves.length);
    let moves = possibleMoves.map((possibleMove, index) => {
        scores[index] = getMoveScore(game.size, possibleMove, snake, apple, 1);
        return new Uint8Array([possibleMove]);
    });

    for (let tick = 1; tick <= maxTick; tick++) {
        const newMoves = [];
        let newScores = new Uint8Array([]);
        moves.forEach((move, index) => {
            let newSnake = game.snake.slice();

            move.forEach(m => {
                newSnake = moveSnake(newSnake, apple, m);
            });

            getPossibleMoves(newSnake, game.size).forEach(possibleMove => {
                const newScore = getMoveScore(game.size, possibleMove, newSnake, apple, tick);
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

    return new Promise((resolve, reject) => {
        if (!moves.length) {
            reject({ nextMove: false, debug: {} });
        }

        const bestMove = getBestMove(moves, scores);

        resolve({
            nextMove: bestMove.move[0],
            debug: {
                bestMoveScore: bestMove.score,
                computationTime: newDiffTime,
                moves: moves.length,
                maxTick,
            },
        });
    });
}
