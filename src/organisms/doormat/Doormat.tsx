import { Anchor, Box, Footer, Text } from "grommet";
import React from "react";
import styled from "styled-components";

import RepeatableLink from "../../../types/RepeatableLink";
import Section from "../../layout/section/Section";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface DoormatProps {
  list_one_label: string;
  list_one_links: RepeatableLink[];
  list_two_label: string;
  list_two_links: RepeatableLink[];
  list_three_label: string;
  list_three_links: RepeatableLink[];
}

const Doormat: React.FC<DoormatProps> = ({
  list_one_label,
  list_one_links,
  list_three_label,
  list_three_links,
  list_two_label,
  list_two_links,
}) => (
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
        <React.Fragment>
          {list_one_label && Array.isArray(list_one_links) && (
            <Box gap="medium">
              <Text weight="bold" size="medium">
                {list_one_label}
              </Text>
              <Box>
                {list_one_links.map(({ label, link }, index) => (
                  <FooterAnchor
                    key={index}
                    margin={{ bottom: "xsmall" }}
                    href={link.url}
                  >
                    {label}
                  </FooterAnchor>
                ))}
              </Box>
            </Box>
          )}
          {list_two_label && Array.isArray(list_two_links) && (
            <Box gap="medium">
              <Text weight="bold" size="medium">
                {list_two_label}
              </Text>
              <Box>
                {list_two_links.map(({ label, link }, index) => (
                  <FooterAnchor
                    key={index}
                    margin={{ bottom: "xsmall" }}
                    href={link.url}
                  >
                    {label}
                  </FooterAnchor>
                ))}
              </Box>
            </Box>
          )}
          {list_three_label && Array.isArray(list_three_links) && (
            <Box gap="medium">
              <Text weight="bold" size="medium">
                {list_one_label}
              </Text>
              <Box>
                {list_three_links.map(({ label, link }, index) => (
                  <FooterAnchor
                    key={index}
                    margin={{ bottom: "xsmall" }}
                    href={link.url}
                  >
                    {label}
                  </FooterAnchor>
                ))}
              </Box>
            </Box>
          )}
        </React.Fragment>
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
