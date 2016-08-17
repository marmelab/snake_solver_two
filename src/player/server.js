import fetch from 'node-fetch';

const config = CONFIG;

export function* getNextMove(game) {
    const [width, height] = game.size;
    const snake = game.snake.slice();
    const apple = game.apple.slice();

    const body = JSON.stringify({ width, height, snake, apple });
    const res = yield fetch(config.entrypoint, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
    });

    if (!res.ok) {
        return { nextMove: false, debug: {} };
    }

    const data = yield res.json();
    const nextMove = data.Path[0];

    return {
        nextMove,
        debug: {
            bestMoveScore: data.BestMoveScore,
            computationTime: data.ComputationTime,
            maxTick: data.MaxTick,
            moves: data.PossibleMoves,
        },
    };
}
