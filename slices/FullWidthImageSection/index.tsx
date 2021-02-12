import { Box, Image } from "grommet";
import React, { FC } from "react";
import styled from "styled-components";

import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import TextContent, {
  TextContentProps,
} from "../../src/organisms/text-content/TextContent";
import ImageProps from "../../types/ImageProps";

type Primary = TextContentProps & {
  image: ImageProps;
};

interface FullWidthImageSectionProps {
  slice: {
    primary: Primary;
  };
}

const FullWidthImageSection: FC<FullWidthImageSectionProps> = ({ slice }) => {
  const {
    primary: { image, ...textContentProps },
  } = slice;
  return (
    <StyledSection justify={"center"}>
      <StyledImage fit="cover" src={image.url} />
      <StyledResponsiveGrid
        gap="small"
        margin="medium"
        columns="medium"
        rows="1"
      >
        <TextContent
          {...textContentProps}
          asCard={true}
          padding="medium"
          background="light-1"
        />
      </StyledResponsiveGrid>
    </StyledSection>
  );
};

type StyledSectionProps = {
  bgUrl?: string;
};

const StyledResponsiveGrid = styled(ResponsiveGrid)``;

const StyledSection = styled(Box)<StyledSectionProps>`
  position: relative;
  min-height: 800px;
`;

const StyledImage = styled(Image)`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export default FullWidthImageSection;
