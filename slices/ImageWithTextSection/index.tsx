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
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
  ],
  xlarge: [
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
  ],
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const gridAreas = {
  small: [
    { name: "image", start: [0, 0], end: [1, 0] },
    { name: "text", start: [0, 1], end: [1, 1] },
  ],
  medium: [
    { name: "image", start: [0, 0], end: [1, 0] },
    { name: "text", start: [0, 1], end: [1, 1] },
  ],
  large: [
    { name: "image", start: [0, 0], end: [5, 0] },
    { name: "text", start: [6, 0], end: [11, 0] },
  ],
  xlarge: [
    { name: "image", start: [0, 0], end: [5, 0] },
    { name: "text", start: [6, 0], end: [11, 0] },
  ],
};

const ImageWithTextSection: FC<ImageWithTextSectionProps> = ({ slice }) => {
  // TODO - use imageSide
  const {
    primary: { image, backgroundColor, imageSide, ...textContentProps },
  } = slice;
  return (
    <StyledSection background={colorMapper(backgroundColor)} justify={"center"}>
      <ResponsiveGrid
        gap="small"
        margin="medium"
        columns={columns}
        areas={gridAreas}
        rows={rows}
        direction={
          imageSide === ImagePosition.imageLeft ? "row" : "row-reverse"
        }
      >
        <Box gridArea="image">
          <StyledImage fill src={image.url} />
        </Box>
        <Box gridArea="text">
          <TextContent {...textContentProps} />
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
