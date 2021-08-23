import { Box, Heading, Paragraph, ResponsiveContext } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { LearningModuleProps } from "../../../pages/learning-modules/[learning_module]";
import { AssessmentApplicationMainProps } from "../../../pages/learning-modules/[learning_module]/[assessment_application]";
import CustomType from "../../../types/CustomType";
import DownloadLink from "../../../types/DownloadLink";
import PageType from "../../../types/PageTypes";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import LearningModulesContext from "../../context/LearningModulesContext";
import Section from "../../layout/section/Section";
import ApplicationStats from "../../molecules/application-stats/ApplicationStats";
import GuideCard, {
  CardColor,
  CardVariant,
} from "../../molecules/guide-card/GuideCard";
import { colorPalette } from "../../theme/pila";
import HeroText from "../hero-text/HeroText";

export interface ModuleHeroProps {
  uid?: string;
  title?: RichTextBlock[];
  body?: RichTextBlock[];
  guideDownload?: Link;
  guideLink?: Link;
  learningModuleUid: string;
  downloadLinks?: DownloadLink[];
}

const ApplicationHero: React.FC<ModuleHeroProps> = ({
  uid,
  title,
  body,
  learningModuleUid,
  downloadLinks,
}) => {
  const size = React.useContext(ResponsiveContext);
  const learningModules = React.useContext(LearningModulesContext);

  const module = learningModules.find(
    (module: CustomType<LearningModuleProps>) =>
      module.uid === learningModuleUid
  );
  const assessmentApplication:
    | AssessmentApplicationMainProps
    | undefined = module?.data?.applications.find((app) => app.uid === uid);

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
            <Button
              primary
              margin={{
                top: size === "small" ? "small" : "large",
                right: size === "small" ? "auto" : "none",
              }}
              size={ButtonSizes.large}
              color={colorPalette.blue}
              label={"View application"}
              link={{
                type: PageType.ASSESSMENT_APPLICATION,
                uid,
              }}
            />
            <Box margin={{ top: "large" }}>
              {downloadLinks &&
                downloadLinks.map(({ label, link, downloadLink }, index) => (
                  <GuideCard
                    key={index}
                    title={label}
                    downloadLink={downloadLink}
                    pageLink={link}
                    variant={CardVariant.SMALL}
                    color={CardColor.DARK}
                  />
                ))}
            </Box>
          </React.Fragment>
        }
      />
      {assessmentApplication && assessmentApplication.applicationsStats && (
        <Box
          pad={{ top: "small", bottom: "small" }}
          background={colorPalette.stormGrey}
        >
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
