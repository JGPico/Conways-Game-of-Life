import { numRows, numCols } from '../functions/GlobalVariables';

export function make2DArray(cols, rows) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(Array.from(Array(cols), () => {
            return Math.floor(Math.random() * 2)
        }))
    }
    return grid;
}

export function countNeighbors(grid, x, y) {
    let neighbors = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += grid[newI][newJ]
            }
        }
    }
    return neighbors;
}

export default make2DArray;