import { Box, Heading, Paragraph, ResponsiveContext } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import PageType from "../../../types/PageTypes";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import Icon from "../../molecules/programme-card/Icon";
import { colorPalette } from "../../theme/pila";
import HeroText from "../hero-text/HeroText";

export interface ModuleHeroProps {
  uid?: string;
  title?: RichTextBlock[];
  body?: RichTextBlock[];
  guideDownload?: Link;
  guideLink?: Link;
}

const ModuleHero: React.FC<ModuleHeroProps> = ({
  uid,
  title,
  body,
  guideDownload,
  guideLink,
}) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <HeroText
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
      title={
        <React.Fragment>
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
          {body && <Paragraph size="large">{RichText.asText(body)}</Paragraph>}
        </React.Fragment>
      }
      info={
        <React.Fragment>
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
        </React.Fragment>
      }
    />
  );
};

const StyledIcon = styled(Icon)`
  width: 100%;
`;

export default ModuleHero;
