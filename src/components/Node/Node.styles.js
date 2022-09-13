import styled from "styled-components";

export const Container = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid black;

  background-color: ${(props) =>
    props.isStart
      ? "green"
      : props.isEnd
      ? "red"
      : props.isWall
      ? "black"
      : ""};
`;
