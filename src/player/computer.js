import { moveSnakeHead, removeSnakeTail, isSnakeHeadAtPosition, isCollide } from '../game/snake';
import { initializeGrid, getAdjacentCell } from '../game/grid';
import findRandomApplePosition from '../game/apple';

const MAX_TICK = 2;
const BLOCK = 1;
const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];

export function getBestMove(moves, scores) {
    const scoresSelected = [];
    scores.forEach((score, index) => {
        if (score >= 1) {
            scoresSelected.push(index);
        }
    });

    const firstScore = scoresSelected[0];
    return moves[firstScore][0];
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

// @FIXME: estimate freedom of movement
export function getMoveScore(move, snake, apple, grid) {
    const newSnake = moveSnakeHead(snake, move);
    const newSnakeHead = newSnake[newSnake.length - 1];

    if (isSnakeHeadAtPosition(newSnake, apple)) {
        if (!getPossibleMoves(apple, grid).length) {
            return -1;
        }

        return 1;
    }

    if (isCollide(newSnakeHead, grid)) {
        return -1;
    }
    return 0;
}

// @FIXME: Add scores
export function getNextMove(game) {
    const snake = game.snake.slice();
    const grid = game.grid.slice();

    const head = snake[snake.length - 1];
    const possibleMoves = getPossibleMoves(head, grid);
    const moves = possibleMoves.map(possibleMove => new Uint8Array([possibleMove]));
    let scores = new Uint8Array([1, 0]);

    for (let tick = 0; tick < MAX_TICK; tick++) {
        moves.forEach(move => {
            let newApple = game.apple.slice();
            let newSnake = game.snake.slice();
            let newGrid = game.grid.slice();

            move.forEach(m => {
                newSnake = moveSnakeHead(newSnake, m);
                if (isSnakeHeadAtPosition(newSnake, newApple)) {
                    newApple = findRandomApplePosition(newGrid);
                } else {
                    newSnake = removeSnakeTail(newSnake);
                }
                newGrid = initializeGrid(game.size, newSnake, newApple);
            });

            const newSnakeHead = newSnake[newSnake.length - 1];
            getPossibleMoves(newSnakeHead, newGrid).forEach(possibleMove => {
                scores = new Uint8Array([...scores, getMoveScore(possibleMove, newSnake, newApple, newGrid)]);
                moves.push(new Uint8Array([...move, possibleMove]));
            });
        });
    }

    return getBestMove(moves, scores);
}
