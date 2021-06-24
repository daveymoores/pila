import { Box, Grid, Heading } from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Section from "../../src/layout/section/Section";
import RichMediaElement from "../../src/molecules/rich-media-element/RichMediaElement";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import ImageProps from "../../types/ImageProps";
import Slice from "../../types/Slice";

interface Primary {
  title: RichTextBlock[];
}

interface Item {
  logo: ImageProps;
}

export type ThanksToInstitutionsSectionProps = Slice<Primary, Item>;

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

const ThanksToInstitutionsSection: FC<{
  slice: ThanksToInstitutionsSectionProps;
}> = ({ slice }) => (
  <Box
    margin={{
      top: "xlarge",
      bottom: "medium",
    }}
    justify={"center"}
  >
    <Section justify={"center"} flex>
      <Grid margin={{ bottom: "large" }} columns={"large"}>
        <Heading level={"1"} size="small" margin="none" alignSelf={"stretch"}>
          {RichText.asText(slice.primary.title)}
        </Heading>
      </Grid>
      {/*TODO - create specific logic for centered wrapping*/}
      <ResponsiveGrid columns={columns} rows={rows}>
        {(slice.items || []).map(({ logo }, index) => (
          <StyledCard key={index} pad={"medium"} justify={"center"}>
            <Box
              style={{ position: "relative" }}
              width={"100%"}
              height={"100%"}
            >
              <StyledRichMediaElement {...logo} layout={"fill"} />
            </Box>
          </StyledCard>
        ))}
      </ResponsiveGrid>
    </Section>
  </Box>
);

const StyledCard = styled(Grid)`
  background-color: #f8f8f8;
  border-radius: 15px;
  min-height: 225px;
`;

const StyledRichMediaElement = styled(RichMediaElement)`
  object-fit: contain !important;
`;

export default ThanksToInstitutionsSection;
