import { Box, Card, Grid, Heading, Image } from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Section from "../../src/layout/section/Section";
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

const ThanksToInstitutionsSection: FC<ThanksToInstitutionsSectionProps> = ({
  slice,
}) => (
  <StyledSection justify={"center"}>
    <Section justify={"center"} flex>
      <Grid margin="medium" columns={"large"}>
        <Heading level={"1"} size="small" margin="none" alignSelf={"stretch"}>
          {RichText.asText(slice.primary.title)}
        </Heading>
      </Grid>
      {/*TODO - create specific logic for centered wrapping*/}
      <ResponsiveGrid margin="medium" columns={columns} rows={rows}>
        {slice.items?.map(({ logo }, index) => (
          <StyledCard
            key={index}
            pad={"large"}
            background={"light-1"}
            round={"medium"}
            justify={"center"}
            elevation={"none"}
          >
            <Image src={logo.url} />
          </StyledCard>
        ))}
      </ResponsiveGrid>
    </Section>
  </StyledSection>
);

const StyledSection = styled(Box)`
  min-height: 800px;
`;

const StyledCard = styled(Card)`
  min-height: 225px;
`;

export default ThanksToInstitutionsSection;
