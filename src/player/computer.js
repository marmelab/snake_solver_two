import { moveSnakeHead, removeSnakeTail, isSnakeHeadAtPosition, isCollide } from '../game/snake';
import { initializeGrid, getAdjacentCell } from '../game/grid';
import findRandomApplePosition from '../game/apple';

const MAX_TICK = 8;
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

// @FIXME: Debug score
export function getNextMove(game) {
    const snake = game.snake.slice();
    const grid = game.grid.slice();
    const apple = game.apple.slice();

    const head = snake[snake.length - 1];
    const possibleMoves = getPossibleMoves(head, grid);
    let scores = new Uint8Array([]);
    let moves = possibleMoves.map(possibleMove => {
        scores = new Uint8Array([...scores, getMoveScore(possibleMove, snake, apple, grid, 1)]);
        return new Uint8Array([possibleMove]);
    });

    for (let tick = 1; tick <= MAX_TICK; tick++) {
        const newMoves = [];
        let newScores = new Uint8Array([]);
        moves.forEach((move, index) => {
            let newSnake = game.snake.slice();
            let newGrid = game.grid.slice();
            let newApple = game.apple.slice();

            move.forEach(m => {
                newSnake = moveSnakeHead(newSnake, m);
                if (isSnakeHeadAtPosition(newSnake, newApple)) {
                    newApple = findRandomApplePosition(game.grid.slice());
                } else {
                    newSnake = removeSnakeTail(newSnake);
                }
                newGrid = initializeGrid(game.size, newSnake, newApple);
            });

            const newSnakeHead = newSnake[newSnake.length - 1];
            getPossibleMoves(newSnakeHead, newGrid).forEach(possibleMove => {
                const newScore = getMoveScore(possibleMove, newSnake, apple, newGrid, tick);
                newScores = new Uint8Array([...newScores, Math.max(newScore, scores[index])]);
                newMoves.push(new Uint8Array([...move, possibleMove]));
            });
        });
        moves = newMoves;
        scores = newScores;
    }

    return getBestMove(moves, scores);
}
