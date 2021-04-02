import { Box, ResponsiveContext } from "grommet";
import React, { FC } from "react";
import styled from "styled-components";

import Section from "../../src/layout/section/Section";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import TextContent, {
  TextContentProps,
} from "../../src/organisms/text-content/TextContent";
import ImageProps from "../../types/ImageProps";
import Slice from "../../types/Slice";
import TextPosition from "../../types/TextPosition";

type Primary = TextContentProps & {
  image: ImageProps;
  textPosition: TextPosition;
};

export type FullWidthImageSectionProps = Slice<Primary, never>;

const columns = {
  small: ["flex"],
  medium: ["flex"],
  large: ["flex", "flex"],
};

const FullWidthImageSection: FC<{ slice: FullWidthImageSectionProps }> = ({
  slice,
}) => {
  const {
    primary: { image, textPosition, ...textContentProps },
  } = slice;
  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const getColumn = (size: string): 1 | 2 | 3 | undefined => {
          switch (size) {
            case "small":
            case "medium":
              return 1;
            case "large":
              return 2;
          }
        };

        return (
          <Box
            width={"100%"}
            align={"center"}
            pad={{ horizontal: size === "large" ? "large" : "4vw" }}
          >
            <StyledBox
              justify={"center"}
              background={`url(${image.url})`}
              round={"medium"}
              margin={{
                horizontal: size === "small" ? "4vw" : "large",
                vertical: "xlarge",
              }}
              pad={{ vertical: size === "large" ? "100px" : "xlarge" }}
            >
              <Section justify={size === "small" ? "start" : "center"} flex>
                <ResponsiveGrid
                  margin={{ vertical: size === "small" ? "4vw" : "large" }}
                  columns={columns}
                  rows="1"
                  justify={
                    textPosition === TextPosition.textLeft ? "start" : "end"
                  }
                >
                  <StyledTextContent
                    {...textContentProps}
                    asCard={true}
                    padding="medium"
                    background="light-1"
                    column={
                      textPosition === TextPosition.textLeft
                        ? 1
                        : getColumn(size)
                    }
                  />
                </ResponsiveGrid>
              </Section>
            </StyledBox>
          </Box>
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
  width: 100%;
  height: auto;
  max-height: 1000px;
  max-width: 1600px;
`;

const StyledTextContent = styled(TextContent)<OrderProps>(
  ({ column }) =>
    column &&
    `
  grid-column: ${column};
  max-width: 400px;
`
);

export default FullWidthImageSection;
