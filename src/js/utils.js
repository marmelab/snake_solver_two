export const isEqual = (a1, a2) => a1 && a1 !== undefined && a2 !== undefined && a1.every((v, i) => v === a2[i]);
