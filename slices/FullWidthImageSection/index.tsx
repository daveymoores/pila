import { Box, ResponsiveContext } from "grommet";
import React, { FC } from "react";
import styled from "styled-components";

import Section from "../../src/layout/section/Section";
import RichMediaElement from "../../src/molecules/rich-media-element/RichMediaElement";
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
  bottomPadding: "xlarge" | "large" | "medium";
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
    primary: { image, textPosition, bottomPadding, ...textContentProps },
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
            pad={{
              top: size === "small" ? "200px" : "0px",
              horizontal: size === "large" ? "large" : "4vw",
            }}
          >
            <StyledBox
              justify={"center"}
              round={"medium"}
              margin={{
                horizontal: size === "small" ? "4vw" : "large",
                top: size === "small" ? "none" : "xlarge",
                bottom: bottomPadding || "xlarge",
              }}
              pad={{
                bottom: size === "small" ? "300px" : "xlarge",
                vertical: size === "large" ? "100px" : "xlarge",
              }}
              style={{ position: "relative" }}
            >
              <RichMediaElement layout={"fill"} {...image} />
              <Section justify={size === "small" ? "start" : "center"} flex>
                <ResponsiveGrid
                  margin={{
                    top: size === "small" ? "-200px" : "large",
                    vertical: size === "small" ? "4vw" : "large",
                  }}
                  columns={columns}
                  rows="1"
                  justify={
                    textPosition === TextPosition.textLeft ? "start" : "end"
                  }
                  gap={size === "small" ? "none" : undefined}
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
