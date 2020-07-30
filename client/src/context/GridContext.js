import React, { useState, createContext } from 'react';

export const GridContext = createContext();

export const GridProvider = (props) => {
    const [generation, setGeneration] = useState(0);

    return (
        <GridContext.Provider value={[generation, setGeneration]}>
            {props.children}
        </GridContext.Provider>
    );
}