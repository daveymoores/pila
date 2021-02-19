import { Box, ResponsiveContext } from "grommet";
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

const columns = {
  small: ["flex"],
  medium: ["flex", "flex"],
  large: ["flex", "flex", "flex"],
};

const FullWidthImageSection: FC<FullWidthImageSectionProps> = ({ slice }) => {
  const {
    primary: { image, textPosition, ...textContentProps },
  } = slice;
  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const getColumn = (size: string): 1 | 2 | 3 | undefined => {
          switch (size) {
            case "small":
              return 1;
            case "medium":
              return 2;
            case "large":
              return 3;
          }
        };

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
              <ResponsiveGrid margin="medium" columns={columns} rows="1">
                <StyledTextContent
                  {...textContentProps}
                  asCard={true}
                  padding="medium"
                  background="light-1"
                  column={
                    textPosition === TextPosition.textLeft ? 1 : getColumn(size)
                  }
                />
              </ResponsiveGrid>
            </Section>
          </StyledBox>
        );
      }}
    </ResponsiveContext.Consumer>
  );
};

interface OrderProps extends TextContentProps {
  column: 1 | 2 | 3 | undefined;
}

const StyledBox = styled(Box)`
  position: relative;
  min-height: 800px;
  max-width: 1900px;
`;

const StyledTextContent = styled(TextContent)<OrderProps>(
  ({ column }) =>
    column &&
    `
  grid-column: ${column};
`
);

export default FullWidthImageSection;
