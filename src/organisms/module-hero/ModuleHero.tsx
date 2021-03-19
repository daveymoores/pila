import { Box, Heading, Paragraph, ResponsiveContext } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import PageType from "../../../types/PageTypes";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import Section from "../../layout/section/Section";
import Breadcrumb from "../../molecules/breadcrumb/breadcrumb";
import { colorPalette } from "../../theme/pila";
import Icon from "../programme-card/Icon";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

export interface ModuleHeroProps {
  uid?: string;
  title?: RichTextBlock[];
  body?: RichTextBlock[];
  guideDownload?: Link;
  guideLink?: Link;
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

const ModuleHero: React.FC<ModuleHeroProps> = ({
  uid,
  title,
  body,
  guideDownload,
  guideLink,
}) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Box
      width={"100%"}
      background={"light-1"}
      pad={{
        top: "xlarge",
      }}
    >
      <Breadcrumb
        links={[
          {
            link: {
              type: PageType.LEARNING_MODULE_HOME,
              uid: "learning_module_home",
            },
            label: "Learning Modules",
          },
          {
            link: { type: PageType.LEARNING_MODULE, uid },
            label: title ? RichText.asText(title) : "",
          },
        ]}
      />
      <Section>
        <ResponsiveGrid
          margin={{
            top: "xlarge",
            bottom: "xlarge",
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
            {size === "small" && (
              <Box width={{ max: "200px" }}>
                <StyledIcon />
              </Box>
            )}
            {title && (
              <Heading
                textAlign={"start"}
                level={"1"}
                alignSelf={"stretch"}
                size="small"
                responsive={false}
                margin={{ top: "medium", bottom: "medium" }}
              >
                {RichText.asText(title)}
              </Heading>
            )}
            {body && (
              <Paragraph size="large">{RichText.asText(body)}</Paragraph>
            )}
          </Box>
          <Box gridArea="info" margin={{ top: "medium" }} align={"center"}>
            <Box width={{ max: "200px" }}>
              {size !== "small" && <StyledIcon />}
              <Paragraph margin={{ top: "medium", bottom: "medium" }}>
                Learn more from the Computational Thinking framework
              </Paragraph>
              <Box direction={"row"} justify={"around"}>
                {guideDownload && (
                  <Button
                    color={colorPalette.green}
                    size={ButtonSizes.small}
                    label={"View"}
                    link={guideDownload}
                  />
                )}
                {guideLink && (
                  <Button
                    color={colorPalette.green}
                    size={ButtonSizes.small}
                    label={"View"}
                    link={guideLink}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </ResponsiveGrid>
      </Section>
    </Box>
  );
};

const StyledIcon = styled(Icon)`
  width: 100%;
`;

export default ModuleHero;
