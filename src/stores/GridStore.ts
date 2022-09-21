import { initializeGrid } from "./../utils/sortingUtils";
import { NODE_END_COL, NODE_START_COL, NODE_START_ROW } from "../models/Cell";
import { ICoordinates } from "../types/Coordinates";
import { makeAutoObservable, runInAction } from "mobx";
import Cell, { NODE_END_ROW } from "../models/Cell";

const DEFAULT_START_COORDINATES = { row: NODE_START_ROW, col: NODE_START_COL };
const DEFAULT_FINISH_COORDINATES = { row: NODE_END_ROW, col: NODE_END_COL };

interface IGridStore {
  grid: Array<Array<Cell>>;
  startCoordinates: ICoordinates;
  finishCoordinates: ICoordinates;
}

export class GridStore implements IGridStore {
  grid = initializeGrid();
  startCoordinates = DEFAULT_START_COORDINATES;
  finishCoordinates = DEFAULT_FINISH_COORDINATES;

  constructor() {
    makeAutoObservable(this);
  }

  updateGridWithWalls = (row: number, col: number, makeWall = true) => {
    const node: Cell = this.grid[row][col];
    node.isWall = makeWall;
    const newGrid = [...this.grid];
    newGrid[row][col] = node;
    this.grid = newGrid;
  };

  resetGrid = () => {
    runInAction(() => {
      this.grid = initializeGrid();
      this.setStart();
      this.setFinish();
    });
  };

  resetKeepWalls = () => {
    runInAction(() => {
      const grid = initializeGrid();
      for (let rows of this.grid) {
        for (let col of rows) {
          const newCell = new Cell(col.x, col.y);
          newCell.isWall = col.isWall;
          newCell.isStart = col.isStart;
          newCell.isEnd = col.isEnd;
          grid[col.x][col.y] = newCell;
        }
      }
      this.grid = grid;
    });
  };

  setFinish = (
    x: number = this.finishCoordinates.row,
    y: number = this.finishCoordinates.col
  ) => {
    const newGrid: Array<Array<Cell>> = [];

    this.grid.forEach((row) => {
      row.forEach((col) => {
        col.isEnd = col.x === x && col.y === y;
      });
      newGrid.push(row);
    });
    this.grid = newGrid;
    this.finishCoordinates = { row: x, col: y };
  };

  setStart = (
    x: number = this.startCoordinates.row,
    y: number = this.startCoordinates.col
  ) => {
    const newGrid: Array<Array<Cell>> = [];

    this.grid.forEach((row) => {
      row.forEach((col) => {
        col.isStart = col.x === x && col.y === y;
      });
      newGrid.push(row);
    });
    this.grid = newGrid;
    this.startCoordinates = { row: x, col: y };
  };
}
