import { Box, Heading, Paragraph, ResponsiveContext } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { LearningModuleProps } from "../../../pages/learning-modules/[learning_module]";
import CustomType from "../../../types/CustomType";
import PageType from "../../../types/PageTypes";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import LearningModulesContext from "../../context/LearningModulesContext";
import Section from "../../layout/section/Section";
import ApplicationStats from "../../molecules/application-stats/ApplicationStats";
import { colorPalette } from "../../theme/pila";
import HeroText from "../hero-text/HeroText";

export interface ModuleHeroProps {
  uid?: string;
  title?: RichTextBlock[];
  body?: RichTextBlock[];
  guideDownload?: Link;
  guideLink?: Link;
  learningModuleUid: string;
}

const ApplicationHero: React.FC<ModuleHeroProps> = ({
  uid,
  title,
  body,
  learningModuleUid,
}) => {
  const size = React.useContext(ResponsiveContext);
  const learningModules = React.useContext(LearningModulesContext);

  const module = learningModules.find(
    (module: CustomType<LearningModuleProps>) =>
      module.uid === learningModuleUid
  );
  const { assessmentApplication } =
    module?.data?.applications.find(
      (app) => app.assessmentApplication.uid === uid
    ) || {};

  return (
    <React.Fragment>
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
            link: { type: PageType.LEARNING_MODULE, uid: learningModuleUid },
            label: module?.data?.title
              ? RichText.asText(module?.data?.title)
              : "[learning_module]",
          },
          {
            link: { type: PageType.ASSESSMENT_APPLICATION, uid },
            label: title ? RichText.asText(title) : "",
          },
        ]}
        title={
          <React.Fragment>
            {title && (
              <Heading
                textAlign={"start"}
                level={"1"}
                alignSelf={"stretch"}
                size="small"
                margin={{ top: "xlarge", bottom: "medium" }}
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
            <Button
              primary
              margin={{ top: "large" }}
              size={ButtonSizes.large}
              color={colorPalette.blue}
              label={"View application"}
              link={{
                type: PageType.ASSESSMENT_APPLICATION,
                uid,
              }}
            />
          </React.Fragment>
        }
      />
      {assessmentApplication?.applicationsStats && (
        <Box pad={{ top: "small", bottom: "small" }} background={"#e8e8e8"}>
          <Section>
            <ApplicationStats
              applicationsStats={assessmentApplication.applicationsStats}
            />
          </Section>
        </Box>
      )}
    </React.Fragment>
  );
};

export default ApplicationHero;
