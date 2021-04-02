import { Box } from "grommet";
import React, { FC } from "react";
import styled from "styled-components";

import colorMapper from "../../helpers/color-mapper/colorMapper";
import Section from "../../src/layout/section/Section";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import TextContent, {
  TextContentProps,
} from "../../src/organisms/text-content/TextContent";
import BackgroundColor from "../../types/BackgroundColor";
import ImagePosition from "../../types/ImagePosition";
import ImageProps from "../../types/ImageProps";
import Slice from "../../types/Slice";

type Primary = TextContentProps & {
  image: ImageProps;
  imageSide: ImagePosition;
  backgroundColor: BackgroundColor;
};

export type ImageWithTextSectionProps = Slice<Primary, never>;

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

const ImageWithTextSection: FC<{ slice: ImageWithTextSectionProps }> = ({
  slice,
}) => {
  const {
    primary: { image, backgroundColor, imageSide, ...textContentProps },
  } = slice;
  return (
    <StyledBox
      background={colorMapper(backgroundColor)}
      justify={"center"}
      pad={{ vertical: "xlarge" }}
    >
      <Section>
        <ResponsiveGrid
          columns={columns}
          areas={gridAreas(imageSide)}
          rows={rows}
        >
          <StyledImageBox
            gridArea="image"
            background={`url(${image?.url})`}
            round={"medium"}
          />
          <Box gridArea="text">
            <TextContent {...textContentProps} padding="medium" />
          </Box>
        </ResponsiveGrid>
      </Section>
    </StyledBox>
  );
};

const StyledImageBox = styled(Box)`
  padding-top: 90%;
`;

const StyledBox = styled(Box)`
  min-height: 800px;
`;

export default ImageWithTextSection;
