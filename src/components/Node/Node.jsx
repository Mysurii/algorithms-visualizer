import { Container } from "./Node.styles";

const Node = ({ col }) => {
  return (
    <Container
      id={`node-${col.x}-${col.y}`}
      isStart={col.isStart}
      isEnd={col.isEnd}
      isWall={col.isWall}
    ></Container>
  );
};

export default Node;
