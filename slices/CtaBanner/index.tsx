import { Box, Grid, Heading, ResponsiveContext } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";

import Button, { ButtonSizes } from "../../src/atoms/button/Button";
import Section from "../../src/layout/section/Section";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../src/theme/pila";
import Slice from "../../types/Slice";

type Primary = {
  title?: RichTextBlock[];
  buttonOneLink?: Link;
  buttonTwoLink?: Link;
  buttonOneLabel?: string;
  buttonTwoLabel?: string;
};

/**
 * This interface is used when the fields are outside of the slice machine
 */
export interface CTABannerAlternateProps {
  ctaSectionTitle?: RichTextBlock[];
  ctaSectionButtonOneLabel?: string;
  ctaSectionButtonOneLink?: Link;
  ctaSectionButtonTwoLabel?: string;
  ctaSectionButtonTwoLink?: Link;
}

export type CtaBannerProps = Slice<Primary, never>;

const columns = {
  small: Array(4).fill("flex"),
  medium: Array(8).fill("flex"),
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto", "auto"],
  xlarge: ["auto", "auto"],
};

const areas = {
  small: [
    { name: "title", start: [0, 0], end: [4, 0] },
    { name: "buttons", start: [0, 1], end: [4, 1] },
  ],
  medium: [
    { name: "title", start: [0, 0], end: [7, 0] },
    { name: "buttons", start: [0, 1], end: [7, 1] },
  ],
  large: [
    { name: "title", start: [2, 0], end: [9, 0] },
    { name: "buttons", start: [2, 1], end: [9, 1] },
  ],
  xlarge: [
    { name: "title", start: [2, 0], end: [9, 0] },
    { name: "buttons", start: [2, 1], end: [9, 1] },
  ],
};

const CtaBanner: FC<{ slice: CtaBannerProps }> = ({ slice }) => {
  const {
    primary: {
      title,
      buttonOneLink,
      buttonOneLabel,
      buttonTwoLink,
      buttonTwoLabel,
    },
  } = slice;

  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      height={{ min: size === "large" ? "450px" : "none" }}
      background={colorPalette.dark_blue}
      pad={{ top: "xlarge", bottom: "xlarge" }}
    >
      <Section justify={"start"} flex>
        <ResponsiveGrid columns={columns} rows={rows} areas={areas}>
          <React.Fragment>
            {title && (
              <Heading
                gridArea={"title"}
                level={"1"}
                size="small"
                margin={"none"}
                color={colorPalette.light_green}
              >
                {RichText.asText(title)}
              </Heading>
            )}
            <Box
              gridArea={"buttons"}
              align={size === "large" ? "start" : "stretch"}
            >
              <Grid
                gap={size}
                columns={size === "small" ? "large" : ["auto", "auto"]}
              >
                {buttonOneLabel && buttonOneLink && (
                  <Button
                    primary
                    color={colorPalette.yellow}
                    size={ButtonSizes.large}
                    type="button"
                    label={buttonOneLabel}
                    link={buttonOneLink}
                  />
                )}
                {buttonTwoLabel && buttonTwoLink && (
                  <Button
                    primary
                    color={colorPalette.yellow}
                    size={ButtonSizes.large}
                    type="button"
                    label={buttonTwoLabel}
                    link={buttonTwoLink}
                  />
                )}
              </Grid>
            </Box>
          </React.Fragment>
        </ResponsiveGrid>
      </Section>
    </Box>
  );
};

export default CtaBanner;
