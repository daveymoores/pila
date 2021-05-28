import { Box, Heading } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import ImageProps from "../../../types/ImageProps";
import Section from "../../layout/section/Section";
import RichMediaElement from "../../molecules/rich-media-element/RichMediaElement";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface HeroImageProps {
  title?: RichTextBlock[];
  image?: ImageProps;
  video?: Link;
}

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto", "auto"],
  xlarge: ["auto", "auto"],
};

const gridAreas = {
  small: [
    { name: "text", start: [0, 0], end: [1, 0] },
    { name: "image", start: [0, 1], end: [1, 1] },
  ],
  medium: [
    { name: "text", start: [0, 0], end: [1, 0] },
    { name: "image", start: [0, 1], end: [1, 1] },
  ],
  large: [
    { name: "text", start: [2, 0], end: [9, 0] },
    { name: "image", start: [2, 1], end: [9, 1] },
  ],
  xlarge: [
    { name: "text", start: [2, 0], end: [9, 0] },
    { name: "image", start: [2, 1], end: [9, 1] },
  ],
};

const HeroImage: React.FC<HeroImageProps> = ({ title, image, video }) => (
  <Box
    width={"100%"}
    background={"light-1"}
    pad={{
      top: "xlarge",
    }}
  >
    <Section>
      <ResponsiveGrid
        margin={{
          top: "small",
          bottom: "xlarge",
        }}
        columns={columns}
        rows={rows}
        areas={gridAreas}
      >
        <React.Fragment>
          {title && (
            <StyledHeading
              gridArea="text"
              textAlign={"center"}
              level={"1"}
              margin={{
                top: "xlarge",
                horizontal: "auto",
              }}
              alignSelf={"stretch"}
              size="small"
            >
              {RichText.asText(title)}
            </StyledHeading>
          )}
          <Box gridArea={"image"} overflow={"hidden"} round={"medium"}>
            <RichMediaElement
              {...image}
              video={video}
              alt={image?.alt || ""}
              layout={"responsive"}
              priority
            />
          </Box>
        </React.Fragment>
      </ResponsiveGrid>
    </Section>
  </Box>
);

const StyledHeading = styled(Heading)`
  @media only screen and (max-width: 600px) {
    margin-top: 96px;
  }
`;

export default HeroImage;
