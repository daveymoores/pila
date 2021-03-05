import { Box, Footer, Text } from "grommet";
import React from "react";
import styled from "styled-components";

import { RoutedTextLink } from "../../../prismic";
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

interface DoormatListProps {
  label: string;
  links: RepeatableLink[];
}

const DoormatList: React.FC<DoormatListProps> = ({ label, links }) => {
  return (
    <React.Fragment>
      {label && Array.isArray(links) && (
        <Box gap="medium">
          <Text weight="bold" size="medium">
            {label}
          </Text>{" "}
          <Box>
            {links.map(({ label, link }, index) => (
              <RoutedTextLink
                key={index}
                label={label}
                link={link}
                margin={{ bottom: "xsmall" }}
                size="small"
                color="white"
                weight="normal"
              />
            ))}
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

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
        <DoormatList label={list_one_label} links={list_one_links} />
        <DoormatList label={list_two_label} links={list_two_links} />
        <DoormatList label={list_three_label} links={list_three_links} />
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

export default Doormat;
