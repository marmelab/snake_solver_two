import { isIn } from '../js/utils';

export function findRandomApplePosition([MAX_WIDTH, MAX_HEIGHT], snake) {
    const positions = [];
    for (let x = 0; x < MAX_WIDTH; x++) {
        for (let y = 0; y < MAX_HEIGHT; y++) {
            const cell = [x, y];

            if (!isIn(cell, snake)) {
                positions.push(cell);
            }
        }
    }

    return positions[Math.floor(Math.random() * positions.length)];
}
