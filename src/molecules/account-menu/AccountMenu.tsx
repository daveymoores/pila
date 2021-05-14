import { Box, Card, CardBody } from "grommet";
import React from "react";
import styled from "styled-components";

import PageType from "../../../types/PageTypes";
import TextLink from "../../atoms/text-link/TextLink";
import { colorPalette } from "../../theme/pila";

const AccountMenu: React.FC = () => (
  <StyledMenuCard width={{ max: "240px" }} pad={"medium"} background={"white"}>
    <CardBody>
      <Box as={"ul"}>
        <Box margin={{ bottom: "small" }} as={"li"}>
          <StyledTextLink
            weight={500}
            label={"Sessions"}
            link={{
              type: PageType.SESSIONS,
            }}
          />
        </Box>
        <Box as={"li"}>
          <StyledTextLink
            weight={500}
            label={"Profile"}
            link={{
              type: PageType.ACCOUNT,
            }}
          />
        </Box>
      </Box>
    </CardBody>
  </StyledMenuCard>
);

const StyledMenuCard = styled(Card)`
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
`;

const StyledTextLink = styled(TextLink)`
  color: ${colorPalette.dark_blue};
`;

export default AccountMenu;
