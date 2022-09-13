import { Container, End, Start } from "./Node.styles";
import { Draggable } from "react-beautiful-dnd";

const Node = ({ col, onMouseDown, onMouseEnter, onMouseUp }) => {
  return (
    <Container
      id={`node-${col.x}-${col.y}`}
      isStart={col.isStart}
      isEnd={col.isEnd}
      isWall={col.isWall}
      onMouseDown={(e) => onMouseDown(e, col.x, col.y)}
      onMouseEnter={() => onMouseEnter(col.x, col.y)}
      onMouseUp={() => onMouseUp(col.x, col.y)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {col.isStart && <Start />}
      {col.isEnd && <End />}
    </Container>
  );
};

export default Node;
