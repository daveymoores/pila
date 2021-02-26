import { Box, Heading, Image } from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import ImageProps from "../../../types/ImageProps";
import Section from "../../layout/section/Section";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface HeroImageProps {
  title: RichTextBlock[];
  image: ImageProps;
}

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: [
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
  ],
  xlarge: [
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
  ],
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
    { name: "text", start: [3, 0], end: [8, 0] },
    { name: "image", start: [2, 1], end: [9, 1] },
  ],
  xlarge: [
    { name: "text", start: [3, 0], end: [8, 0] },
    { name: "image", start: [2, 1], end: [9, 1] },
  ],
};

const HeroImage: React.FC<HeroImageProps> = ({ title, image }) => (
  <Box>
    <Section>
      <ResponsiveGrid
        margin={{
          top: "xlarge",
          bottom: "xlarge",
        }}
        columns={columns}
        rows={rows}
        areas={gridAreas}
      >
        <Heading
          gridArea="text"
          textAlign={"center"}
          level={"1"}
          margin="none"
          alignSelf={"stretch"}
          size="small"
          responsive={false}
        >
          {RichText.asText(title)}
        </Heading>
        <Box gridArea={"image"} overflow={"hidden"} round={"medium"}>
          <Image src={image.url} />
        </Box>
      </ResponsiveGrid>
    </Section>
  </Box>
);

export default HeroImage;
