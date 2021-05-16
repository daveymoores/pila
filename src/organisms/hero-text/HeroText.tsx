import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

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
        <StyledResponsiveGrid
          margin={{
            bottom: "large",
          }}
          columns={columns}
          rows={rows}
          areas={gridAreas}
          hasLinks={!!links?.length}
        >
          <React.Fragment>
            <StyledBox gridArea="title" align={"center"}>
              {title}
            </StyledBox>
            {info && (
              <Box gridArea="info" margin={{ top: "medium" }} align={"center"}>
                {info}
              </Box>
            )}
          </React.Fragment>
        </StyledResponsiveGrid>
      </Section>
    </Box>
  );
};

const StyledBox = styled(Box)`
  margin: 48px 0 0;

  @media only screen and (min-width: 601px) {
    margin: 24px 0 0;
  }
`;

const StyledResponsiveGrid = styled(ResponsiveGrid)<{ hasLinks: boolean }>`
  margin-top: ${(props) => (props.hasLinks ? "0px" : "96px")};

  @media only screen and (min-width: 601px) {
    margin-top: 96px;
  }
`;

export default HeroText;
