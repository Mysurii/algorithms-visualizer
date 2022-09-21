import styled from "styled-components";
import { Flex } from "../../../components/globalStyles";

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
  border: double #f5f5f5;
`;

export const SideNavContainer = styled.div`
  width: 40%;
  margin: 2vh 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center !important;
`;

export const IconContainer = styled.div`
  display: flex;
`;

export const StyledFlex = styled(Flex)`
  align-items: center;
  border: none;
  height: 100px !important;
  position: relative;
  align-items: center;
  height: 100%;
  position: relative;
  border-bottom: ${(props) => (props.isActive ? "2px solid #0275d8" : "")};
  user-select: none;
`;

export const Highlight = styled.p`
  font-size: 1.4rem;
  color: #0275d8;
  font-weight: bold;
`;
