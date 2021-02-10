import styled from "@emotion/styled";
import { Anchor, Box, Footer, Text } from "grommet";
import React from "react";

const data = [
  ["Legal", "terms", "privacy", "resources", "security"],
  ["Legal", "terms", "privacy", "resources", "security"],
  ["Legal", "terms", "privacy", "resources", "security"],
  ["Legal", "terms", "privacy", "resources", "security"],
  ["Legal", "terms", "privacy", "resources", "security"],
];

const Doormat = () => (
  <Footer background="dark-1" pad="large">
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
  </Footer>
);

const StyledAnchor = styled(Anchor)`
  font-weight: 200;
`;

const FooterAnchor = ({ ...rest }) => (
  <StyledAnchor href="/" size="small" color="white" {...rest} />
);

export default Doormat;
