export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
};

export const gridDefault = () => {
  const rows = 18;
  const cols = 10;
  const array = [];
  for (let row = 0; row < rows; row +=1) {
    array.push([]);
    for (let col = 0; col < cols; col +=1) {
      array[row].push(0);
    };
  };

  // Fill array with 18 arrays each containing 10 zeros (0)
  return array;
};

export const shapes = [
  // none
  [[[0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]]],

  // I
  [[[0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]]],

  // T
  [[[0,0,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],

  // L
  [[[0,0,0,0],
    [1,1,1,0],
    [1,0,0,0],
    [0,0,0,0]],

   [[1,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,0,1,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]]],

  // J
  [[[1,0,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,1,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,0,0,0],
    [1,1,1,0],
    [0,0,1,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [1,1,0,0],
    [0,0,0,0]]],

  // Z
  [[[0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]],

   [[0,0,1,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],

  // S
  [[[0,0,0,0],
    [0,1,1,0],
    [1,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [0,0,0,0]]],

  // O
  [[[0,1,1,0],
    [0,1,1,0],
    [0,0,0,0],
    [0,0,0,0]]]
];

export const randomShape = () => {
  return random(1, shapes.length - 1);
};

export const defaultState = () => {
  return {
    // Create an empty grid
    grid: gridDefault(),
    // Get a new random shape
    shape: randomShape(),
    // set rotation of the shape to 0
    rotation: 0,
    // set the 'x' position of the shape to 5 and y to -4, which puts the shape in the center of the grid, above the top
    x: 5,
    y: -4,
    // set the index of the next shape to a new random shape
    nextShape: randomShape(),
    // Tell the game that it's currently running
    isRunning: true,
    // Set the score to 0
    score: 0,
    // Set the default speed
    speed: 1000,
    // Game isn't over yet
    gameOver: false
  };
};

export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length;
};

export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation]
  // Loop through all rows and cols of the **shape**
  for (let row = 0; row < currentShape.length; row += 1) {
    for (let col = 0; col < currentShape[row].length; col += 1) {
      // look for a 1 here
      if (currentShape[row][col] !== 0) {
        // x offset on grid
        const proposedX = col + x;
        const proposedY = row + y;
        if (proposedY < 0) {
          continue;
        }
        // Get the row on the grid
        const possibleRow = grid[proposedY];
        if (possibleRow) {
          if (possibleRow[proposedX] === undefined || possibleRow[proposedX] !== 0) {
            return false;
          };
        } else {
          return false;
        };
      };
    };
  };
  return true;
};

export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  // Get the block array
  const block = shapes[shape][rotation];
  // Copy the grid
  const newGrid = [...grid];
  // Map the block onto the grid
  for (let row = 0; row < block.length; row += 1) {
    for (let col = 0; col < block[row].length; col += 1) {
      if (block[row][col]) {
        newGrid[row + y][col + x] = shape;
      } 
    }
    return newGrid;
  }
}

export const checkRows = (grid) => {
  // Points increase for each row completed
  // i.e 40 points for completing one row, 100 points for two rows
  const points = [0, 40, 100, 300, 1200];
  let completedRows = 0;
  for (let row = 0; row < grid.lengthl; row += 1) {
    // No empty cells means it can't find a 0, so the row must be complete!
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1;
      // Remove teh row and add a new empty one at the top
      grid.splice(row, 1);
      grid.unshift(Array(10).fill(0));
    }
  }
  return points[completedRows];
}