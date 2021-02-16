import { Anchor, Box, Footer, Text } from "grommet";
import React from "react";
import styled from "styled-components";

import Section from "../../layout/section/Section";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

const data = [
  ["Legal", "terms", "privacy", "resources", "security"],
  ["Legal", "terms", "privacy", "resources", "security"],
  ["Legal", "terms", "privacy", "resources", "security"],
];

const Doormat = () => (
  <StyledFooter
    background="brand"
    pad={{ top: "xlarge", bottom: "xlarge" }}
    flex
    align={"start"}
  >
    <Section>
      <StyledResponsiveGrid
        margin="medium"
        rows={{
          small: ["auto", "auto", "auto", "auto"],
          medium: ["auto", "auto", "auto"],
          large: ["auto", "auto"],
          xlarge: ["auto", "auto"],
        }}
        columns={{
          small: ["auto"],
          medium: ["flex", "flex", "flex"],
          large: ["flex", "flex", "flex", "1/2"],
          xlarge: ["flex", "flex", "flex", "1/2"],
        }}
      >
        {data.map((item) => (
          <Box gap="medium" key={item[0]}>
            <Text weight="bold" size="medium">
              {item[0]}
            </Text>
            <Box>
              {[1, 2, 3, 4].map((i) => (
                <FooterAnchor key={item[i]} margin={{ bottom: "xsmall" }}>
                  {item[i]}
                </FooterAnchor>
              ))}
            </Box>
          </Box>
        ))}
      </StyledResponsiveGrid>
    </Section>
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
