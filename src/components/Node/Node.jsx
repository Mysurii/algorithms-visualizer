import { Container, End, Start } from "./Node.styles";

const Node = ({ col }) => {
  return (
    <Container
      id={`node-${col.x}-${col.y}`}
      isStart={col.isStart}
      isEnd={col.isEnd}
      isWall={col.isWall}
    >
      {col.isStart && <Start />}
      {col.isEnd && <End />}
    </Container>
  );
};

export default Node;
