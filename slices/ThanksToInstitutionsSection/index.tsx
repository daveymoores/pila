import { Box, Card, Grid, Heading, Image } from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import ImageProps from "../../types/ImageProps";

interface ThanksToInstitutionsSectionProps {
  slice: {
    primary: {
      title: RichTextBlock[];
    };
    items: {
      logo: ImageProps;
    }[];
  };
}

const columns = {
  small: ["auto"],
  medium: ["auto", "auto"],
  large: ["auto", "auto", "auto"],
  xlarge: ["1/3", "1/3", "1/3"],
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const ThanksToInstitutionsSection: FC<ThanksToInstitutionsSectionProps> = ({
  slice,
}) => (
  <StyledSection background={"light-2"} justify={"center"}>
    <Box>
      <Grid margin="medium" columns={"large"}>
        <Heading level={"1"} margin="none" alignSelf={"stretch"} size="medium">
          {RichText.asText(slice.primary.title) || "This is a hard coded title"}
        </Heading>
      </Grid>
      {/*TODO - create specific logic for centered wrapping*/}
      <ResponsiveGrid margin="medium" columns={columns} rows={rows}>
        {slice.items?.map(({ logo }, index) => (
          <Card key={index} pad={"medium"} background={"light-1"}>
            <Image src={logo.url} />
          </Card>
        ))}
      </ResponsiveGrid>
    </Box>
  </StyledSection>
);

const StyledSection = styled(Box)`
  min-height: 800px;
`;

export default ThanksToInstitutionsSection;
