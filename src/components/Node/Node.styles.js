import styled from "styled-components";

export const Container = styled.div`
  min-width: 25px;
  min-height: 25px;
  border: 1px solid lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  /* outline: 1px solid rgb(175, 216, 248);
  display: inline-block; */

  background-color: ${(props) =>
    props.isStart
      ? "rgba(0, 100, 0, 0.3)"
      : props.isEnd
      ? "rgba(100, 0, 0, 0.3)"
      : props.isWall
      ? "rgb(12, 53, 71)"
      : ""};
`;
