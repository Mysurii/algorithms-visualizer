export const cols = 25;
export const rows = 10;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
export const NODE_END_ROW = rows - 1;
export const NODE_END_COL = cols - 1;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.neighbours = [];
    this.isWall = false;
    if (!this.isStart && !this.isEnd && Math.random(1) < 0.2) {
      this.isWall = true;
    }
    this.previous = null;
  }

  addNeighbours = (grid) => {
    if (this.x > 0) this.neighbours.push(grid[this.x - 1][this.y]);
    if (this.x < rows - 1) this.neighbours.push(grid[this.x + 1][this.y]);
    if (this.y > 0) this.neighbours.push(grid[this.x][this.y - 1]);
    if (this.y < cols - 1) this.neighbours.push(grid[this.x][this.y + 1]);
  };
}

export default Cell;
