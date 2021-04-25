import { Box, Heading, Paragraph, ResponsiveContext } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import ImageProps from "../../../types/ImageProps";
import PageType from "../../../types/PageTypes";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import LearningModuleIcon from "../../atoms/learning-module-icon/LearningModuleIcon";
import { colorPalette } from "../../theme/pila";
import HeroText from "../hero-text/HeroText";

export interface ModuleHeroProps {
  uid?: string;
  title?: RichTextBlock[];
  body?: RichTextBlock[];
  guideDownload?: Link;
  guideLink?: Link;
  icon?: ImageProps;
}

const ModuleHero: React.FC<ModuleHeroProps> = ({
  uid,
  title,
  body,
  guideDownload,
  guideLink,
  icon,
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
          {size === "small" && <LearningModuleIcon icon={icon} />}
          {title && (
            <Heading
              textAlign={"start"}
              level={"1"}
              alignSelf={"stretch"}
              size="small"
              margin={{
                top: size === "small" ? "xlarge" : "none",
                bottom: "medium",
              }}
            >
              {RichText.asText(title)}
            </Heading>
          )}
          {body && (
            <Paragraph size={size === "small" ? "medium" : "large"}>
              {RichText.asText(body)}
            </Paragraph>
          )}
        </React.Fragment>
      }
      info={
        <React.Fragment>
          <Box width={{ max: "200px" }}>
            {size !== "small" && <LearningModuleIcon icon={icon} />}
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

export default ModuleHero;
