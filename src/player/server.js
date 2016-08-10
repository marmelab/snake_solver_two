import fetch from 'node-fetch';

const entrypoint = 'http://localhost:1323/';

export function * getNextMove(game) {
    const [width, height] = game.size;
    const snake = game.snake.slice();
    const apple = game.apple.slice();

    const body = JSON.stringify({ width, height, snake, apple });
    const res = yield fetch(entrypoint, {
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
    const nextMove = data.path[0];
    const debug = data.debug;

    return { nextMove, debug };
}
