import { Box, Heading, Paragraph } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import ImageProps from "../../../types/ImageProps";
import PageType from "../../../types/PageTypes";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import LearningModuleIcon from "../../atoms/learning-module-icon/LearningModuleIcon";
import {
  MobileOnly,
  TabletUp,
} from "../../atoms/responsive-helpers/ResponsiveHelpers";
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
  const parsedTitle = title ? RichText.asText(title) : "[LEARNING_MODULE]";
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
          label: parsedTitle,
        },
      ]}
      title={
        <React.Fragment>
          <MobileOnly>
            <LearningModuleIcon icon={icon} />
          </MobileOnly>

          <React.Fragment>
            <MobileOnly>
              <Heading
                textAlign={"start"}
                level={"1"}
                alignSelf={"stretch"}
                size="small"
                margin={{
                  top: "xlarge",
                  bottom: "medium",
                }}
              >
                {parsedTitle}
              </Heading>
            </MobileOnly>
            <TabletUp>
              <Heading
                textAlign={"start"}
                level={"1"}
                alignSelf={"stretch"}
                size="small"
                margin={{
                  top: "none",
                  bottom: "medium",
                }}
              >
                {parsedTitle}
              </Heading>
            </TabletUp>
          </React.Fragment>
          {body && (
            <React.Fragment>
              <MobileOnly>
                <Paragraph size={"medium"}>{RichText.asText(body)}</Paragraph>
              </MobileOnly>
              <TabletUp>
                <Paragraph size={"large"}>{RichText.asText(body)}</Paragraph>
              </TabletUp>
            </React.Fragment>
          )}
        </React.Fragment>
      }
      info={
        <React.Fragment>
          <Box width={{ max: "200px" }}>
            <TabletUp>
              <LearningModuleIcon icon={icon} />
            </TabletUp>
            <Paragraph margin={{ top: "medium", bottom: "medium" }}>
              Learn more from the {parsedTitle} framework
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
