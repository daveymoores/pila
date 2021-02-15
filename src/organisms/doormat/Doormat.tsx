import { Anchor, Box, Footer, Text } from "grommet";
import React from "react";
import styled from "styled-components";

import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

const data = [
  ["Legal", "terms", "privacy", "resources", "security"],
  ["Legal", "terms", "privacy", "resources", "security"],
  ["Legal", "terms", "privacy", "resources", "security"],
  ["Legal", "terms", "privacy", "resources", "security"],
  ["Legal", "terms", "privacy", "resources", "security"],
];

const Doormat = () => (
  <StyledFooter background="brand" pad="xlarge" flex>
    <StyledResponsiveGrid
      rows={{
        small: ["auto", "auto", "auto", "auto"],
        medium: ["auto", "auto", "auto"],
        large: ["auto", "auto"],
        xlarge: ["auto", "auto"],
      }}
      columns={{
        small: ["auto"],
        medium: ["auto", "auto"],
        large: ["flex", "flex", "flex", "1/2"],
        xlarge: ["flex", "flex", "flex", "1/2"],
      }}
    >
      {data.map((item) => (
        <Box gap="medium" key={item[0]}>
          <Text weight="bold" size="small">
            {item[0]}
          </Text>
          <Box>
            {[1, 2, 3, 4].map((i) => (
              <FooterAnchor key={item[i]}>{item[i]}</FooterAnchor>
            ))}
          </Box>
        </Box>
      ))}
    </StyledResponsiveGrid>
  </StyledFooter>
);

const StyledFooter = styled(Footer)`
  min-height: 600px;
`;

const StyledResponsiveGrid = styled(ResponsiveGrid)`
  flex-grow: 1;
`;

const StyledAnchor = styled(Anchor)`
  font-weight: 200;
`;

const FooterAnchor = ({ ...rest }) => (
  <StyledAnchor href="/" size="small" color="white" {...rest} />
);

export default Doormat;
