import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

import { colorPalette, fontWeights } from "../../theme/pila";

const Category: React.FC<{ name: string }> = ({ name }) => (
  <StyledBox
    background={"light-1"}
    round={"small"}
    pad={{ left: "medium", right: "medium", top: "5px", bottom: "5px" }}
    margin={{ right: "small" }}
  >
    {name}
  </StyledBox>
);

const StyledBox = styled(Box)`
  font-size: 14px;
  font-weight: ${fontWeights.bold};
  color: ${colorPalette.grey};
`;

export default Category;
