import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
`;
