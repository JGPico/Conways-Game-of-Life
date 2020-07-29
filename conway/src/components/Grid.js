import React, { useState, useCallback, useRef, useContext } from 'react';
import produce from 'immer';
import '../App.css';
import { make2DArray, countNeighbors, makeEmpty2DArray } from '../functions/utils';
import { GridContext } from '../context/GridContext';
import { numRows, numCols } from '../functions/GlobalVariables';

function Grid() {

    let [gridArray, setGridArray] = useState(() => make2DArray(numCols, numRows));
    const [generation, setGeneration] = useContext(GridContext);

    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    function handleClick(col, row) {
        const newGrid = produce(gridArray, gridCopy => {
            gridCopy[col][row] = gridArray[col][row] ? 0 : 1;
        })
        setGridArray(newGrid);
    }

    function resetGrid() {
        setGeneration(0);
        setGridArray(() => makeEmpty2DArray(numCols, numRows));
    }

    function randomizeGrid() {
        setGeneration(0);
        setGridArray(() => make2DArray(numCols, numRows));
    }

    const step = useCallback(() => {

        setGeneration(prevGen => prevGen + 1);

        setGridArray(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numCols; i++) {
                    for (let j = 0; j < numRows; j++) {
                        // check all neighbors, only if within grid
                        // if neighbor is 1, add to neighbors value
                        let neighbors = countNeighbors(g, i, j);

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

    }, [])

    const simulate = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        step();
        setTimeout(simulate, 200);
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
                {running ? "Stop" : "Start"}
            </button>

            <button
                className='button'
                onClick={() => {
                    step();
                }}>
                Step
            </button>

            <button
                className='button'
                onClick={() => {
                    resetGrid();
                }}>
                Clear
            </button>

            <button
                className='button'
                onClick={() => {
                    randomizeGrid();
                }}>
                Randomize
            </button>

            <div className='blockContainer25'>
                {gridArray.map((cols, i) => {
                    return cols.map((row, j) =>
                        <div
                            // onDragEnter={() => handleClick(i, j)}
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