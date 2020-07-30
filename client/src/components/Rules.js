import React, { useContext } from 'react';
import { GridContext } from '../context/GridContext';
import './componentCSS/Rules.css';


function Rules() {

    const [generation, setGeneration] = useContext(GridContext);

    return (

        <div className='rulesContainer'>
            <p>Generation: {generation}</p>

            <p>Rules:</p>
            <p>The universe of the Game of Life
            is a two-dimensional
            orthogonal grid of square cells,
            each of which is in one of two possible
            states, live or dead,
            (or populated and unpopulated, respectively).
            Every cell interacts with its eight neighbours,
            which are the cells that are horizontally,
            vertically, or diagonally adjacent. At each
            step in time, the following transitions occur:
            </p>
            <ul>
                <li>
                    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                </li>
                <li>
                    Any live cell with two or three live neighbours lives on to the next generation.
                </li>
                <li>
                    Any live cell with more than three live neighbours dies, as if by overpopulation.
                </li>
                <li>
                    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                </li>
            </ul>
        </div>

    );
}

export default Rules;
