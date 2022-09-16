import Cell from "../models/Cell";

export enum CoordinatesType {
  START,
  FINISH,
}

export interface ICoordinates {
  row: number;
  col: number;
}

export interface IGrid {
  grid: Array<Array<Cell>>;
}
