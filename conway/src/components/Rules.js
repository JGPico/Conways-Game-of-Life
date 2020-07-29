import React, { useContext } from 'react';
import { GridContext } from '../context/GridContext';
import '../App.css';


function Rules() {

    const [generation, setGeneration] = useContext(GridContext);

    return (
        <div>
            <p style={{ padding: '0px 0px 0px 20px' }}>Generation</p>
            <p style={{ padding: '0px 20px' }}>{generation}</p>
        </div>
    );
}

export default Rules;
