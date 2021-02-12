import styled from "@emotion/styled";
import { Box, Image } from "grommet";
import React, { FC } from "react";

import colorMapper from "../../helpers/color-mapper/colorMapper";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import TextContent, {
  TextContentProps,
} from "../../src/organisms/text-content/TextContent";
import BackgroundColor from "../../types/BackgroundColor";
import ImagePosition from "../../types/ImagePosition";
import ImageProps from "../../types/ImageProps";

type Primary = TextContentProps & {
  image: ImageProps;
  imageSide: ImagePosition;
  backgroundColor: BackgroundColor;
};

interface ImageWithTextSectionProps {
  slice: {
    primary: Primary;
  };
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
          { name: "text", start: [0, 0], end: [5, 0] },
        ]
      : [
          { name: "image", start: [0, 0], end: [5, 0] },
          { name: "text", start: [7, 0], end: [11, 0] },
        ],
  xlarge:
    imageSide === ImagePosition.imageRight
      ? [
          { name: "image", start: [6, 0], end: [11, 0] },
          { name: "text", start: [0, 0], end: [5, 0] },
        ]
      : [
          { name: "image", start: [0, 0], end: [5, 0] },
          { name: "text", start: [7, 0], end: [11, 0] },
        ],
});

const ImageWithTextSection: FC<ImageWithTextSectionProps> = ({ slice }) => {
  const {
    primary: { image, backgroundColor, imageSide, ...textContentProps },
  } = slice;
  return (
    <StyledSection background={colorMapper(backgroundColor)} justify={"center"}>
      <ResponsiveGrid
        margin="medium"
        columns={columns}
        areas={gridAreas(imageSide)}
        rows={rows}
      >
        <Box gridArea="image">
          <StyledImage fill src={image.url} />
        </Box>
        <Box gridArea="text">
          <TextContent {...textContentProps} padding="medium" />
        </Box>
      </ResponsiveGrid>
    </StyledSection>
  );
};

const StyledSection = styled(Box)`
  min-height: 800px;
`;

const StyledImage = styled(Image)`
  border-radius: 25px;
`;

export default ImageWithTextSection;
