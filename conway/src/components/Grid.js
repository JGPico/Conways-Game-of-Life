import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import '../App.css';
import { make2DArray, countNeighbors } from '../functions/utils';
import { numRows, numCols } from '../functions/GlobalVariables';

function Grid() {
    // const numRows = 10;
    // const numCols = 10;

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

    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    function handleClick(col, row) {
        const newGrid = produce(gridArray, gridCopy => {
            gridCopy[col][row] = gridArray[col][row] ? 0 : 1;
        })
        setGridArray(newGrid)
    }

    const simulate = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGridArray(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numCols; i++) {
                    for (let j = 0; j < numRows; j++) {
                        // check all neighbors, only if within grid
                        // if neighbor is 1, add to neighbors value
                        let neighbors = countNeighbors(g, i, j);
                        console.log("Neighbors", neighbors);

                        // put in Conway's rules here, for number of neighbors
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }
                    }
                }
            })
        })

        setTimeout(simulate, 2000);
    }, [])

    return (
        <div>

            <button
                className='button'
                onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        simulate();
                    }
                }}>
                {running ? "stop" : "start"}
            </button>

            <div className='blockContainer'>
                {gridArray.map((cols, i) => {
                    return cols.map((row, j) =>
                        <div
                            onDragEnter={() => handleClick(i, j)}
                            onMouseDown={() => handleClick(i, j)}
                            key={`${i}-${j}`}
                            style={{ backgroundColor: gridArray[i][j] ? 'blue' : undefined }}
                            className='block'></div>
                    )
                })}
            </div>
        </div>
    );
}

export default Grid;