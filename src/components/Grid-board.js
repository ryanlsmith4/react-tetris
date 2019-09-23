import React, { Component } from 'react';
import GridSquare from './grid-square';

class GridBoard extends Component {
  // generates an array of 18 rows, each containing 10 GridSquares
  makeGrid() {
    const grid = [];
    for (let row = 0; row < 18; row+=1 ) {
      grid.push([])
      for (let col = 0; col < 10; col+=1 ) {
        grid[row].push(<GridSquare key={`${col}${row}`} color="1" /> )
      };
    };
    return grid;
  };
  // The components generated in makeGrid are rendered in div.grid-board
  render() {
    return (
      <div className='grid-board'>
        {this.makeGrid()}
      </div>
    );
  };
};

export default GridBoard;