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
  border-bottom: ${(props) => (props.isActive ? "2px solid lightblue" : "")};
`;

export const Button = styled.button`
  position: relative;
  padding: 1em 1.5em;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  margin: 1em 0.8em;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 20%;
    height: 20%;
    border: 2px solid;
    transition: all 0.6s ease;
    border-radius: 2px;
  }

  &::before {
    top: 0;
    left: 0;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: black;
    border-left-color: black;
  }

  &::after {
    bottom: 0;
    right: 0;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: black;
    border-right-color: black;
  }

  &:hover:after,
  &:hover:before {
    width: 100%;
    height: 100%;
  }
`;