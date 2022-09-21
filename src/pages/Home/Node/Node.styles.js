import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { IoMan } from "react-icons/io5";

export const StyledNode = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid lightsteelblue;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1px solid #f5f5f5;
  user-select: none;
  background-color: ${(props) => (props.isWall ? "rgb(12, 53, 71)" : "")};
`;

export const StartIcon = styled(IoMan)`
  font-size: 1.5rem;
  cursor: ${(props) => (props.movable ? "move" : "")};
`;

export const FinishIcon = styled(MdLocationOn)`
  font-size: 1.5rem;
  cursor: ${(props) => (props.movable ? "move" : "")};
`;
