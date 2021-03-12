import styled from "@emotion/styled";
import { Box, Heading, Paragraph } from "grommet";
import { ResponsiveContext } from "grommet/es6";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import Button, { ButtonSizes } from "../../atoms/button/Button";
import Section from "../../layout/section/Section";
import { colorPalette } from "../../theme/pila";
import Icon from "../programme-card/Icon";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface ModuleHeroProps {
  title: RichTextBlock[];
  body: RichTextBlock[];
  programmeGuideDownload: Link;
  programmeGuideLink: Link;
}

const columns = {
  small: ["flex", "flex", "flex", "flex"],
  medium: ["flex", "flex", "flex", "flex", "flex", "flex", "flex", "flex"],
  large: [
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
  ],
  xlarge: [
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
  ],
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const gridAreas = {
  small: [
    { name: "title", start: [0, 0], end: [4, 0] },
    { name: "info", start: [0, 1], end: [4, 1] },
  ],
  medium: [
    { name: "title", start: [0, 0], end: [4, 0] },
    { name: "info", start: [5, 0], end: [8, 0] },
  ],
  large: [
    { name: "title", start: [0, 0], end: [7, 0] },
    { name: "info", start: [8, 0], end: [12, 0] },
  ],
  xlarge: [
    { name: "title", start: [0, 0], end: [8, 0] },
    { name: "info", start: [9, 0], end: [12, 0] },
  ],
};

const ModuleHero: React.FC<ModuleHeroProps> = ({
  title,
  body,
  programmeGuideDownload,
  programmeGuideLink,
}) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Section background={"light-1"}>
      <ResponsiveGrid
        margin={{
          top: "xlarge",
          bottom: "xlarge",
        }}
        columns={columns}
        rows={rows}
        areas={gridAreas}
      >
        <Box gridArea="title" align={"center"} margin={{ bottom: "medium" }}>
          {size === "small" && (
            <Box width={{ max: "200px" }}>
              <StyledIcon />
            </Box>
          )}
          <Heading
            textAlign={"start"}
            level={"1"}
            alignSelf={"stretch"}
            size="small"
            responsive={false}
          >
            {RichText.asText(title)}
          </Heading>
          <Paragraph>{RichText.asText(body)}</Paragraph>
        </Box>
        <Box gridArea="info" margin={{ top: "medium" }} align={"center"}>
          <Box width={{ max: "200px" }}>
            {size !== "small" && <StyledIcon />}
            <Paragraph>
              Learn more from the Computational Thinking framework
            </Paragraph>
            <Box direction={"row"} justify={"around"} margin={{ top: "small" }}>
              <Button
                color={colorPalette.green}
                size={ButtonSizes.small}
                label={"View"}
                link={programmeGuideDownload}
              />
              <Button
                color={colorPalette.green}
                size={ButtonSizes.small}
                label={"View"}
                link={programmeGuideLink}
              />
            </Box>
          </Box>
        </Box>
      </ResponsiveGrid>
    </Section>
  );
};

const StyledIcon = styled(Icon)`
  width: 100%;
`;

export default ModuleHero;
