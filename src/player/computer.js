import { moveSnakeHead, removeSnakeTail, isSnakeHeadAtPosition, isCollide } from '../game/snake';
import { initializeGrid, getAdjacentCell } from '../game/grid';
import { maxTick } from '../js/config';
import { isEqual } from '../js/utils';

const BLOCK = 1;
const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];

export function getBestMove(moves, scores) {
    const scoresSelected = [];
    scores.forEach((score, index) => {
        if (score > 0) {
            scoresSelected.push({ move: moves[index], score });
        }
    });

    scoresSelected.sort((scoreA, scoreB) => scoreB.score - scoreA.score);
    return scoresSelected.shift().move[0];
}

export function getSnakePossibleMoves(snake, grid) {
    const snakeHead = snake[snake.length - 1];
    const snakeTail = snake[0];

    const possibleMove = [];
    [UP, RIGHT, DOWN, LEFT].forEach(move => {
        const [xNeighbor, yNeighbor] = getAdjacentCell(move, snakeHead);
        if (isEqual([xNeighbor, yNeighbor], snakeTail) ||
            (!isCollide([xNeighbor, yNeighbor], grid) && grid[xNeighbor][yNeighbor] !== BLOCK)) {
            possibleMove.push(move);
        }
    });

    return possibleMove;
}

export function getPossibleMoves(cell, grid) {
    const possibleMove = [];
    [UP, RIGHT, DOWN, LEFT].forEach(move => {
        const [xNeighbor, yNeighbor] = getAdjacentCell(move, cell);
        if (!isCollide([xNeighbor, yNeighbor], grid) && grid[xNeighbor][yNeighbor] !== BLOCK) {
            possibleMove.push(move);
        }
    });

    return possibleMove;
}

export function getMoveScore(move, snake, apple, grid, tick) {
    const newSnake = moveSnakeHead(snake.slice(), move);
    const newSnakeHead = newSnake[newSnake.length - 1];

    if (isSnakeHeadAtPosition(newSnake, apple.slice())) {
        // @FIXME: estimate freedom of movement
        if (!getPossibleMoves(apple.slice(), grid.slice()).length) {
            return 0;
        }

        return (1 / tick) * 10;
    }

    if (isCollide(newSnakeHead, grid.slice())) {
        return 0;
    }

    return 1;
}

export function getLastMove(snake, apple) {
    const snakeHead = snake[snake.length - 1];
    return [UP, RIGHT, DOWN, LEFT].filter(move => {
        const [xNeighbor, yNeighbor] = getAdjacentCell(move, snakeHead);
        if (isEqual([xNeighbor, yNeighbor], apple)) {
            return true;
        }
        return false;
    })[0];
}

export function getNextMove(game) {
    const snake = game.snake.slice();
    const grid = game.grid.slice();
    const apple = game.apple.slice();

    if (snake.length === game.surface - 1) {
        const lastMove = getLastMove(snake, apple);
        if (lastMove) {
            return lastMove;
        }
    }

    const possibleMoves = getSnakePossibleMoves(snake, grid);
    let scores = new Uint8Array([]);
    let moves = possibleMoves.map(possibleMove => {
        scores = new Uint8Array([...scores, getMoveScore(possibleMove, snake, apple, grid, 1)]);
        return new Uint8Array([possibleMove]);
    });

    for (let tick = 1; tick <= maxTick; tick++) {
        const newMoves = [];
        let newScores = new Uint8Array([]);
        moves.forEach((move, index) => {
            let newApple = game.apple.slice();
            let newSnake = game.snake.slice();
            let newGrid = game.grid.slice();

            move.forEach(m => {
                newSnake = moveSnakeHead(newSnake, m);
                if (isSnakeHeadAtPosition(newSnake, newApple)) {
                    newApple = '';
                } else {
                    newSnake = removeSnakeTail(newSnake);
                }
            });

            newGrid = initializeGrid(game.size, newSnake, newApple);
            getSnakePossibleMoves(newSnake, newGrid).forEach(possibleMove => {
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

    return getBestMove(moves, scores);
}
