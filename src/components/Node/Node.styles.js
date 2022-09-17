import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { IoMan } from "react-icons/io5";

export const StyledNode = styled.div`
  min-width: 25px;
  min-height: 25px;
  border: 1px solid lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1px solid rgb(175, 216, 248);
  user-select: none;
  background-color: ${(props) =>
    props.isStart
      ? "rgba(0, 100, 0, 0.3)"
      : props.isEnd
      ? "rgba(100, 0, 0, 0.3)"
      : props.isWall
      ? "rgb(12, 53, 71)"
      : ""};
`;

export const StartIcon = styled(IoMan)`
  font-size: 1.5rem;
  cursor: ${(props) => (props.movable ? "move" : "")};
`;

export const FinishIcon = styled(MdLocationOn)`
  font-size: 1.5rem;
  cursor: ${(props) => (props.movable ? "move" : "")};
`;
