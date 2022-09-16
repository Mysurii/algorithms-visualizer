import React from "react";
import Cell from "../../models/Cell";
import { CoordinatesType } from "../../types/Coordinates";
import { FinishIcon, StartIcon } from "../Draggable/Draggable.styles";
import { Container } from "./Node.styles";

interface props {
  col: Cell,
  setStart: Function,
  setFinish: Function,
  onMouseDown: Function,
  onMouseEnter: Function,
  onMouseUp: Function,
}

const Node: React.FC<props> = ({ col, setStart, setFinish, onMouseDown, onMouseEnter, onMouseUp }) => {

  const allowDrop = (ev: any) => {
    ev.preventDefault();
  }

  const eraseOnMouseDown = () => {
    if (col.isStart || col.isEnd) return;
    onMouseDown();
  }

  const drop = (ev: any) => {
    const data = ev.dataTransfer.getData("type");
    console.log(data);
    data == CoordinatesType.START ? setStart(col.x, col.y) : setFinish(col.x, col.y)
    ev.preventDefault();
  }

  return (
    <Container
      id={`node-${col.x}-${col.y}`}
      isStart={col.isStart}
      isEnd={col.isEnd}
      isWall={col.isWall}
      onMouseDown={(e: MouseEvent) => onMouseDown(e, col.x, col.y)}
      onMouseEnter={() => onMouseEnter(col.x, col.y)}
      onMouseUp={() => onMouseUp(col.x, col.y)}
      onContextMenu={(e: MouseEvent) => e.preventDefault()}
      onDragOver={allowDrop}
      onDrop={drop}
    >
      {col.isStart && <StartIcon draggable />}
      {col.isEnd && <FinishIcon />}
    </Container>
  );
};

export default Node;
