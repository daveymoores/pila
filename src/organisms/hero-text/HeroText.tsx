import { Box, ResponsiveContext } from "grommet";
import React from "react";

import { Theme } from "../../../types/Theme";
import Section from "../../layout/section/Section";
import Breadcrumb, {
  BreadcrumbProps,
} from "../../molecules/breadcrumb/breadcrumb";
import { colorPalette } from "../../theme/pila";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

const columns = {
  small: Array(4).fill("flex"),
  medium: Array(8).fill("flex"),
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const gridAreas = {
  small: [
    { name: "title", start: [0, 0], end: [3, 0] },
    { name: "info", start: [0, 1], end: [3, 1] },
  ],
  medium: [
    { name: "title", start: [0, 0], end: [4, 0] },
    { name: "info", start: [5, 0], end: [7, 0] },
  ],
  large: [
    { name: "title", start: [0, 0], end: [7, 0] },
    { name: "info", start: [8, 0], end: [11, 0] },
  ],
  xlarge: [
    { name: "title", start: [0, 0], end: [8, 0] },
    { name: "info", start: [9, 0], end: [11, 0] },
  ],
};

interface HeroText extends Partial<BreadcrumbProps> {
  title: JSX.IntrinsicAttributes;
  info?: JSX.IntrinsicAttributes;
  variant?: Theme;
}

const HeroText: React.FC<HeroText> = ({
  variant = Theme.LIGHT,
  links,
  title,
  info,
}) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      width={"100%"}
      background={variant === Theme.LIGHT ? "light-1" : colorPalette.dark_blue}
      pad={{
        top: "xlarge",
      }}
    >
      {links && <Breadcrumb links={links} />}
      <Section>
        <ResponsiveGrid
          margin={{
            top: "xlarge",
            bottom: "large",
          }}
          columns={columns}
          rows={rows}
          areas={gridAreas}
        >
          <Box
            gridArea="title"
            align={"center"}
            margin={{ bottom: size === "small" ? "medium" : "none" }}
          >
            {title}
          </Box>
          <Box gridArea="info" margin={{ top: "medium" }} align={"center"}>
            {info}
          </Box>
        </ResponsiveGrid>
      </Section>
    </Box>
  );
};

export default HeroText;
