import React from 'react';
import './App.css';
import { GridContext, GridProvider } from './context/GridContext';
import Grid from './components/Grid';
import Rules from './components/Rules';
import Title from './components/Title';
import About from './components/About';

function App() {
  return (
    <GridProvider>
      <div className='pageContainer'>
        <Title />
        <div className='gridWrapper'>
          <Grid />
          <Rules />
        </div>
        <About />
      </div>
    </GridProvider>
  );
}

export default App;
