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
  small: Array(4).fill("flex"),
  medium: Array(6).fill("flex"),
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const gridAreas = (imageSide: ImagePosition) => ({
  small: [
    { name: "image", start: [1, 0], end: [2, 0] },
    { name: "text", start: [0, 1], end: [3, 1] },
  ],
  medium:
    imageSide === ImagePosition.imageRight
      ? [
          { name: "text", start: [0, 0], end: [3, 0] },
          { name: "image", start: [4, 0], end: [5, 0] },
        ]
      : [
          { name: "image", start: [0, 0], end: [1, 0] },
          { name: "text", start: [2, 0], end: [5, 0] },
        ],
  large:
    imageSide === ImagePosition.imageRight
      ? [
          { name: "text", start: [1, 0], end: [8, 0] },
          { name: "image", start: [9, 0], end: [11, 0] },
        ]
      : [
          { name: "image", start: [0, 0], end: [2, 0] },
          { name: "text", start: [3, 0], end: [10, 0] },
        ],
});

const StepsSection: FC<{ slice: ImageBlockProps }> = ({ slice }) => {
  const { primary, items } = slice;

  return (
    <StyledBox>
      <Section>
        <Grid margin={{ bottom: "large" }} columns={"large"}>
          <StyledHeading
            level={"1"}
            size="small"
            margin="none"
            alignSelf={"stretch"}
          >
            {RichText.asText(primary.title)}
          </StyledHeading>
        </Grid>
        {items?.length &&
          items.map((item: Item, index: number) => (
            <ResponsiveGrid
              key={index}
              columns={columns}
              areas={gridAreas(
                index % 2 == 0
                  ? ImagePosition.imageLeft
                  : ImagePosition.imageRight
              )}
              rows={rows}
              margin={"large"}
              align={"start"}
            >
              <Box gridArea={"image"} style={{ position: "relative" }}>
                <Box
                  round={"50%"}
                  background={colorPalette.white}
                  pad={"small"}
                  elevation={"large"}
                  height={"45px"}
                  width={"45px"}
                  justify={"center"}
                  align={"center"}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: index % 2 == 0 ? 0 : "auto",
                    right: index % 2 == 0 ? "auto" : 0,
                    zIndex: 1,
                    textAlign: "center",
                    transform: `translate3d(${
                      index % 2 == 0 ? -30 : 30
                    }%, -40%, 0)`,
                    boxShadow: "0 8px 16px 0 rgb(0 0 0 / 5%)",
                  }}
                >
                  <Heading level={3} size={"20px"}>
                    {index + 1}
                  </Heading>
                </Box>
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
                round={"medium"}
                background={colorPalette.white}
                pad="large"
              >
                <Heading
                  level={"4"}
                  size="small"
                  margin={{ bottom: "small" }}
                  alignSelf={"stretch"}
                >
                  {RichText.asText(item.title)}
                </Heading>
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
  background: linear-gradient(180deg, #6a75c0 0%, #6f7bc0 50%, #7481c0 100%);
  padding: 20px;
`;

const StyledHeading = styled(Heading)`
  color: white;
`;

const StyledRichText = styled(RichTextParser)`
  > * {
    color: ${colorPalette.grey};
    font-size: 16px;
    line-height: 24px;
  }
`;

export default StepsSection;
