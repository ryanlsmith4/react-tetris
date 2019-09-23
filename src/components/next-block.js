import React, { Component } from 'react';
import GridSquare from './grid-square';
import { connect } from 'react-redux';
import { shapes } from '../utils';

class NextBlock extends Component {

  makeGrid() {
  // const box = [[0,0,0,0,],[0,0,0,0,],[0,0,0,0,],[0,0,0,0,]];
  const { shape } = this.props;
  // get the array for this shape first rotation
  const block = shapes[shape][0];
  // get the empty shape
  const box = shapes[0][0];
  
  // Map the block to the grid
  return box.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      // If there is a 1 use the shape index (ASK MITCHELL ABOUT THIS)
      const color = block[row][col] === 0 ? 0 : shape;
      return <GridSquare key={`${row}${col}`} color={color} />
    });
  });
  };
  render() {
    return (
      <div className="next-block">
        {this.makeGrid()}
      </div>
    );
  };
};

// Map State to props
const mapStateToProps = (state) => {
  return {
    shape: state.game.nextShape
  };
};

export default connect(mapStateToProps)(NextBlock);