import React from "react";
import Cell from "../../models/Cell";
import { Container, End, Start } from "./Node.styles";

interface props {
  col: Cell,
  onMouseDown: Function,
  onMouseEnter: Function,
  onMouseUp: Function,
}

const Node: React.FC<props> = ({ col, onMouseDown, onMouseEnter, onMouseUp }) => {
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
    >
      {col.isStart && <Start />}
      {col.isEnd && <End />}
    </Container>
  );
};

export default Node;
