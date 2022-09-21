export const cols = 50;
export const rows = 20;

export const NODE_START_ROW = 10;
export const NODE_START_COL = 15;
export const NODE_END_ROW = 10;
export const NODE_END_COL = 35;

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
  isVisited: boolean = false;

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

  getNeighbour = (): Cell | undefined => {
    const unvisitedNeigbours: Array<Cell> = [];

    this.neighbours.forEach((neighbour) => {
      if (!neighbour.isVisited) unvisitedNeigbours.push(neighbour);
    });

    if (unvisitedNeigbours.length > 0) {
      const idx = Math.floor(Math.random() * unvisitedNeigbours.length);
      return unvisitedNeigbours[idx];
    }
  };
}

export default Cell;
