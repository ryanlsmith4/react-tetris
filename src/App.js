import React, { Component } from 'react';
import './App.css';
import GridBoard from './components/grid-board';
import NextBlock from './components/next-block';
import ScoreBoard from './components/score-board';
import Controls from './components/controls'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tetris Redux</h1>
        </header>
          <GridBoard color="1" />
          <NextBlock />
          <ScoreBoard />
          <Controls />
      </div>
    );
  };
};

export default App;
