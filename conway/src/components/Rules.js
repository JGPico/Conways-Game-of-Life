import React, { useContext } from 'react';
import { GridContext } from '../context/GridContext';
import '../App.css';


function Rules() {

    const [generation, setGeneration] = useContext(GridContext);

    return (
        <div className='rulesContainer'>
            <p>Generation: {generation}</p>

            <p>Rules:</p>
            <p>The Game of Life, also known simply
            as Life, is a cellular automaton
            devised by the British mathematician
            John Horton Conway in 1970.[1] It
            is a zero-player game, meaning
            that its evolution is determined
            by its initial state, requiring
            no further input. One interacts
            with the Game of Life by creating
            an initial configuration and observing
                how it evolves</p>
        </div>
    );
}

export default Rules;
