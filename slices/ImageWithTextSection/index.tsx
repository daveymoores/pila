import styled from "@emotion/styled";
import { Box, Card } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";

import ResponsiveGrid from "../../src/organisms/ResponsiveGrid/ResponsiveGrid";
import ImageProps from "../../types/ImageProps";

enum ImagePosition {
  imageLeft = "image_left",
  imageRight = "image_right",
}

interface ImageWithTextSectionProps {
  slice: {
    primary: {
      eyebrowHeadline: RichTextBlock[];
      title: RichTextBlock[];
      description: RichTextBlock[];
      image: ImageProps;
      imageSide: ImagePosition;
      link: Link;
    };
  };
}

const ImageWithTextSection: FC<ImageWithTextSectionProps> = ({ slice }) => (
  <StyledSection>
    <ResponsiveGrid gap="small" margin="medium" columns="medium" rows="xsmall">
      <Card>
        {slice.primary.title && <RichText render={slice.primary.title} />}
        {slice.primary.description && (
          <RichText render={slice.primary.description} />
        )}
      </Card>
    </ResponsiveGrid>
  </StyledSection>
);

const StyledSection = styled(Box)`
  min-height: 800px;
`;

export default ImageWithTextSection;
