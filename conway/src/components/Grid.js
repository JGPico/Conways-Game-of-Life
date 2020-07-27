import React, { useState } from 'react';
import produce from 'immer';
import '../App.css';
import make2DArray from '../functions/Make2DArray';

function Grid() {
    const numRows = 10;
    const numCols = 10;

    // let [gridArray, setGridArray] = useState(() => {
    //     const rows = [];
    //     for (let i = 0; i < numRows; i++) {
    //         rows.push(Array.from(Array(numCols), () => {
    //             return Math.floor(Math.random() * 2)
    //         }))
    //     }
    //     return rows;
    // });

    let [gridArray, setGridArray] = useState(() => make2DArray(numCols, numRows));

    function handleClick(col, row) {
        const newGrid = produce(gridArray, gridCopy => {
            gridCopy[col][row] = gridArray[col][row] ? 0 : 1;
        })
        setGridArray(newGrid)
    }

    console.log(gridArray)

    return (
        <div className='blockContainer'>
            {gridArray.map((cols, i) => {
                return cols.map((row, j) =>
                    <div
                        onClick={() => handleClick(i, j)}
                        key={`${i}-${j}`}
                        style={{ backgroundColor: gridArray[i][j] ? 'blue' : undefined }}
                        className='block'></div>
                )
            })}
        </div>
    );
}

export default Grid;