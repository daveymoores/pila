import { Box, Grid, Heading } from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Section from "../../src/layout/section/Section";
import RichMediaElement from "../../src/molecules/rich-media-element/RichMediaElement";
import RichTextParser from "../../src/molecules/rich-text-parser/RichTextParser";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../src/theme/pila";
import ImagePosition from "../../types/ImagePosition";
import ImageProps from "../../types/ImageProps";
import Slice from "../../types/Slice";

interface Item {
  title: RichTextBlock[];
  body: RichTextBlock[];
  image: ImageProps;
}

interface Primary {
  title: RichTextBlock[];
}

export type ImageBlockProps = Slice<Primary, Item>;

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const gridAreas = (imageSide: ImagePosition) => ({
  small: [
    { name: "image", start: [0, 0], end: [1, 0] },
    { name: "text", start: [0, 1], end: [1, 1] },
  ],
  medium: [
    { name: "image", start: [0, 0], end: [1, 0] },
    { name: "text", start: [0, 1], end: [1, 1] },
  ],
  large:
    imageSide === ImagePosition.imageRight
      ? [
          { name: "image", start: [6, 0], end: [11, 0] },
          { name: "text", start: [0, 0], end: [4, 0] },
        ]
      : [
          { name: "image", start: [0, 0], end: [5, 0] },
          { name: "text", start: [7, 0], end: [11, 0] },
        ],
  xlarge:
    imageSide === ImagePosition.imageRight
      ? [
          { name: "image", start: [7, 0], end: [11, 0] },
          { name: "text", start: [0, 0], end: [4, 0] },
        ]
      : [
          { name: "image", start: [0, 0], end: [5, 0] },
          { name: "text", start: [7, 0], end: [11, 0] },
        ],
});

const StepsSection: FC<{ slice: ImageBlockProps }> = ({ slice }) => {
  const { primary, items } = slice;

  return (
    <StyledBox
      background="light-1"
      justify={"center"}
      pad={{ vertical: "xlarge" }}
    >
      <Section>
        <Grid margin={{ bottom: "large" }} columns={"large"}>
          <Heading level={"1"} size="small" margin="none" alignSelf={"stretch"}>
            {RichText.asText(primary.title)}
          </Heading>
        </Grid>
        {items?.length &&
          items.map((item: Item, index: number) => (
            <ResponsiveGrid
              key={index}
              columns={columns}
              areas={gridAreas(
                index % 2 ? ImagePosition.imageRight : ImagePosition.imageLeft
              )}
              rows={rows}
            >
              <Box gridArea={"image"}>
                {item.image?.url && (
                  <RichMediaElement
                    {...item.image}
                    alt={item.image?.alt || ""}
                    layout={"responsive"}
                  />
                )}
              </Box>
              <Box
                gridArea="text"
                round={"large"}
                background={colorPalette.white}
                pad="large"
              >
                <StyledRichText body={item.body} />
              </Box>
            </ResponsiveGrid>
          ))}
      </Section>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  min-height: 800px;
`;

const StyledRichText = styled(RichTextParser)`
  padding-top: 1em;

  > * {
    color: ${colorPalette.grey};
    font-size: 16px;
  }
`;

export default StepsSection;
