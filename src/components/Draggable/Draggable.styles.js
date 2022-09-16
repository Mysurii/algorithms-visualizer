import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { IoMan } from "react-icons/io5";

export const StartIcon = styled(IoMan)`
  font-size: 1.5rem;
  cursor: ${(props) => (props.movable ? "move" : "")};
`;

export const FinishIcon = styled(MdLocationOn)`
  font-size: 1.5rem;
  cursor: ${(props) => (props.movable ? "move" : "")};
`;
