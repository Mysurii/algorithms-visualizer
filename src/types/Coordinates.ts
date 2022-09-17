import Cell from "../models/Cell";

export enum MouseType {
  START,
  FINISH,
  WALL,
  UNVISITED,
}

export interface ICoordinates {
  row: number;
  col: number;
}

export interface IGrid {
  grid: Array<Array<Cell>>;
}
