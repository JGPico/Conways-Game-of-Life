import React, { useState, useCallback, useRef, useContext } from 'react';
import produce from 'immer';
import './componentCSS/Grid.css';
import { make2DArray, countNeighbors, makeEmpty2DArray } from '../functions/utils';
import { GridContext } from '../context/GridContext';
import { numRows, numCols } from '../functions/GlobalVariables';

function Grid() {

    let [gridArray, setGridArray] = useState(() => make2DArray(numCols, numRows));
    const [generation, setGeneration] = useContext(GridContext);

    const [speed, setSpeed] = useState(400);
    const speedRef = useRef(speed);
    speedRef.current = speed;

    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    // Changes the value of a single block in the grid
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

    function changeSpeed(setting) {
        setSpeed(setting);
    }

    // one step of the simulation
    const step = useCallback(() => {

        setGeneration(prevGen => prevGen + 1);

        setGridArray(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numCols; i++) {
                    for (let j = 0; j < numRows; j++) {
                        // check all neighbors, only if within grid
                        // if neighbor is 1, add to neighbors value
                        let neighbors = countNeighbors(g, i, j);

                        // Conway's rules here, for number of neighbors
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

    // Infinite loop to animate, until the stop button is pushed.
    const simulate = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        step();
        setTimeout(simulate, speedRef.current);
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

            <div className='speedContainer'>
                <ul className='speedWrapper'>
                    <div className='arrowWrapper'>
                        <i class="fas fa-angle-double-right"></i>
                        <span>Speed</span>
                    </div>
                    <div className='speedNav'>
                        <button onClick={() => changeSpeed(1000)} className='speedItem speedButton'>
                            <i class="far fa-hourglass"></i>
                            <span className='speedText'>
                                Slow
                        </span>
                        </button>
                        <button onClick={() => changeSpeed(400)} className='speedItem speedButton'>
                            <i class="fas fa-play"></i>
                            <span className='speedText'>
                                Normal
                        </span>
                        </button>
                        <button onClick={() => changeSpeed(200)} className='speedItem speedButton'>
                            <i class="fas fa-bolt"></i>
                            <span className='speedText'>
                                Fast
                        </span>
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Grid;