export const cols = 30;
export const rows = 20;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
export const NODE_END_ROW = rows - 1;
export const NODE_END_COL = cols - 1;

class Cell {
  x: number;
  y: number;
  g: number = 0;
  f: number = 0;
  h: number = 0;
  isEnd: boolean;
  isStart: boolean;
  isWall: boolean = false;
  previous: Cell | null = null;
  neighbours: Array<Cell> = [];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
  }

  addNeighbours = (grid: Array<Array<Cell>>) => {
    if (this.x > 0) this.neighbours.push(grid[this.x - 1][this.y]);
    if (this.x < rows - 1) this.neighbours.push(grid[this.x + 1][this.y]);
    if (this.y > 0) this.neighbours.push(grid[this.x][this.y - 1]);
    if (this.y < cols - 1) this.neighbours.push(grid[this.x][this.y + 1]);
  };
}

export default Cell;