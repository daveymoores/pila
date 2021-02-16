import { Box } from "grommet";
import React, { FC } from "react";
import styled from "styled-components";

import Section from "../../src/layout/section/Section";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import TextContent, {
  TextContentProps,
} from "../../src/organisms/text-content/TextContent";
import ImageProps from "../../types/ImageProps";
import TextPosition from "../../types/TextPosition";

type Primary = TextContentProps & {
  image: ImageProps;
  textPosition: TextPosition;
};

interface FullWidthImageSectionProps {
  slice: {
    primary: Primary;
  };
}

const FullWidthImageSection: FC<FullWidthImageSectionProps> = ({ slice }) => {
  const {
    primary: { image, textPosition, ...textContentProps },
  } = slice;
  console.log(textPosition);
  return (
    <StyledBox
      justify={"center"}
      background={`url(${image.url})`}
      round={"medium"}
      margin={{
        horizontal: "auto",
        vertical: "medium",
      }}
    >
      <Section justify={"center"} flex>
        <StyledResponsiveGrid margin="medium" columns="medium" rows="1">
          <StyledTextContent
            {...textContentProps}
            asCard={true}
            padding="medium"
            background="light-1"
            column={textPosition === TextPosition.textLeft ? 1 : 2}
          />
        </StyledResponsiveGrid>
      </Section>
    </StyledBox>
  );
};

interface OrderProps extends TextContentProps {
  column: 1 | 2;
}

const StyledResponsiveGrid = styled(ResponsiveGrid)``;

const StyledBox = styled(Box)`
  position: relative;
  min-height: 800px;
  max-width: 1900px;
`;

const StyledTextContent = styled(TextContent)<OrderProps>`
  grid-column: ${(props) => props.column};
`;

export default FullWidthImageSection;
