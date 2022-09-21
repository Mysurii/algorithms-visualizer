import styled from "styled-components";
import { Flex } from "../../components/globalStyles";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
`;

export const StyledFlex = styled(Flex)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4vh;
`;
