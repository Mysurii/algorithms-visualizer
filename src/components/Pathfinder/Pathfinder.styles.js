import styled from "styled-components";
import { Flex } from "../globalStyles";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
`;

export const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  width: fit-content;
  border: double lightblue;
`;

export const SideNavContainer = styled.div`
  width: 60%;
  margin: 5vh 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center !important;
`;

export const IconContainer = styled.div`
  display: flex;
`;

export const Text = styled.p`
  font-size: 1.5rem;
  user-select: none;
  margin: ${(props) => props.margin};
`;

export const StyledFlex = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  border: none;
  height: 100px !important;
  position: relative;
  align-items: center;
  height: 100%;
  position: relative;
  cursor: pointer;
  border-bottom: ${(props) => (props.isActive ? "2px solid #0275d8" : "")};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const Highlight = styled(Text)`
  font-size: 1.4rem;
  color: #0275d8;
  font-weight: bold;
`;