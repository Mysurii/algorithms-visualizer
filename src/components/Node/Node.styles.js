import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { IoMan } from "react-icons/io5";

export const StyledNode = styled.div`
  min-width: 25px;
  min-height: 25px;
  border: 1px solid lightsteelblue;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1px solid #f5f5f5;
  user-select: none;
  background-color: ${(props) =>
    props.isStart
      ? "rgba(0, 100, 0, 0.3)"
      : props.isEnd
      ? "rgba(100, 0, 0, 0.3)"
      : props.isWall
      ? "rgb(12, 53, 71)"
      : ""};

  animation-name: ${(props) => props.isWall && "animate"};
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  @keyframes animate {
    0% {
      transform: scale(0.6);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }
`;


export const StartIcon = styled(IoMan)`
  font-size: 1.5rem;
  cursor: ${(props) => (props.movable ? "move" : "")};
`;

export const FinishIcon = styled(MdLocationOn)`
  font-size: 1.5rem;
  cursor: ${(props) => (props.movable ? "move" : "")};
`;
