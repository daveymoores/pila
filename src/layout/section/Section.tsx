import { Box, BoxProps } from "grommet";
import React from "react";
import styled from "styled-components";

const Section: React.FC<BoxProps> = ({ children, ...restProps }) => (
  <StyledBox justify={"center"} {...restProps}>
    {children}
  </StyledBox>
);

const StyledBox = styled(Box)`
  width: 100%;
  flex-grow: 1;
  padding: 0 4vw;

  @media (min-width: 768px) {
    padding: 0 2.5rem;
  }

  @media (min-width: 960px) {
    padding: 0 4rem;
  }

  @media (min-width: 1248px) {
    padding: 0 5rem;
    max-width: 1480px;
    margin: 0 auto;
  }
`;

export default Section;
