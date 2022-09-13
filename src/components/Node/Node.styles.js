import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { IoMan } from "react-icons/io5";

export const Container = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.isStart
      ? "rgba(0, 100, 0, 0.3)"
      : props.isEnd
      ? "rgba(100, 0, 0, 0.3)"
      : props.isWall
      ? "black"
      : ""};
`;

export const Start = styled(IoMan)`
  font-size: 1.5rem;
  cursor: move;
`;

export const End = styled(MdLocationOn)`
  font-size: 1.5rem;
  cursor: move;
`;
