import { isEqual } from '../js/utils';

const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];

export function getAdjacentCell(move, [x, y]) {
    switch (move) {
    case UP:
        return [x - 1, y];
    case RIGHT:
        return [x, y + 1];
    case DOWN:
        return [x + 1, y];
    case LEFT:
        return [x, y - 1];
    default:
        return false;
    }
}

export function isEmptyCell(cell, snake) {
    for (const s of snake) {
        if (isEqual(cell, s)) {
            return false;
        }
    }

    return true;
}

export function isOutsideBoundingBox([xCell, yCell], [MAX_WIDTH, MAX_HEIGHT]) {
    if (xCell >= MAX_WIDTH || yCell >= MAX_HEIGHT || xCell < 0 || yCell < 0) {
        return true;
    }

    return false;
}
