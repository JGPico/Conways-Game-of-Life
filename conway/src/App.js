import React from 'react';
import './App.css';
import { GridContext, GridProvider } from './context/GridContext';
import Grid from './components/Grid';
import Rules from './components/Rules';

function App() {
  return (
    <GridProvider>
      <div className='pageContainer'>
        <div className='gridWrapper'>
          <Grid />
          <Rules />
        </div>
      </div>
    </GridProvider>
  );
}

export default App;
