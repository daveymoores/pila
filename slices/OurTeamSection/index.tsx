import { Box, Card, Grid, Heading } from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Section from "../../src/layout/section/Section";
import RichMediaElement from "../../src/molecules/rich-media-element/RichMediaElement";
import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../src/theme/pila";
import ImageProps from "../../types/ImageProps";
import Slice from "../../types/Slice";

interface Primary {
  title: RichTextBlock[];
  gridLength: "2" | "3";
  bottomPadding: "xlarge" | "large" | "medium";
}

interface Item {
  image: ImageProps;
  name: string;
  position: string;
  body: RichTextBlock[];
}

export type OurTeamSectionProps = Slice<Primary, Item>;

const columns = (gridLength = "3") => ({
  small: ["auto"],
  medium: ["auto", "auto"],
  large: Array(parseInt(gridLength)).fill("auto"),
  xlarge: Array(parseInt(gridLength)).fill("1/3"),
});

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const OurTeamSection: FC<{
  slice: OurTeamSectionProps;
}> = ({ slice }) => (
  <Box
    margin={{
      top: "xlarge",
      bottom: slice.primary.bottomPadding,
    }}
    justify={"center"}
  >
    <Section justify={"center"} flex>
      <Grid margin={{ bottom: "large" }} columns={"large"}>
        <Heading level={"1"} size="small" margin="none" alignSelf={"stretch"}>
          {RichText.asText(slice.primary.title)}
        </Heading>
      </Grid>
      <ResponsiveGrid columns={columns(slice.primary.gridLength)} rows={rows}>
        {(slice.items || []).map(({ image, name, position, body }, index) => (
          <StyledCard
            key={index}
            pad={"medium"}
            background={"light-1"}
            round={"medium"}
            justify={"start"}
            elevation={"none"}
          >
            <Grid columns={["auto", "auto"]} rows={"1"} gap={"small"}>
              <Box
                width={"40px"}
                height={"40px"}
                round={"50%"}
                overflow={"hidden"}
              >
                <RichMediaElement
                  {...image}
                  alt={image?.alt || ""}
                  layout={"fixed"}
                />
              </Box>
              <Box direction={"column"}>
                <Heading
                  level={5}
                  size={"18px"}
                  margin={{ top: "xsmall", bottom: "small" }}
                >
                  {name}
                </Heading>
                <Heading
                  level={6}
                  size={"16px"}
                  color={colorPalette.grey}
                  margin={{ top: "none", bottom: "small" }}
                >
                  {position}
                </Heading>
                <StyledRichTextParser body={body} />
              </Box>
            </Grid>
          </StyledCard>
        ))}
      </ResponsiveGrid>
    </Section>
  </Box>
);

const StyledCard = styled(Card)`
  min-height: 225px;
`;

const StyledRichTextParser = styled(RichTextParser)`
  > * {
    font-size: 16px;
    line-height: 24px;
  }
`;

export default OurTeamSection;
