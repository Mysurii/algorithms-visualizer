import { rows, cols } from "./../models/Cell";
import Cell from "../models/Cell";

export const initializeGrid = (): Array<Array<Cell>> => {
  let arr = new Array();
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      const cell = new Cell(i, j);
      cell.previous = null;
      arr[i][j] = cell;
    }
  }
  arr = setNeighbours(arr);
  return arr;
};

const setNeighbours = (arr: Array<Array<Cell>>): Array<Array<Cell>> => {
  arr.forEach((rows) => {
    rows.forEach((cell) => {
      cell.addNeighbours(arr);
    });
  });
  return arr;
};

export const heuristic = (a: Cell, b: Cell) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhatten distance
