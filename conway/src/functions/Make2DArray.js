export function make2DArray(cols, rows) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(Array.from(Array(cols), () => {
            return Math.floor(Math.random() * 2)
        }))
    }
    return grid;
}

export default make2DArray;