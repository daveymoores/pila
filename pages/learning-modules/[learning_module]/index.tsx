import { asText, isFilled } from "@prismicio/client";
import { Box, Heading, Paragraph } from "grommet";
import React from "react";

import {
  createGetStaticPaths,
  createGetStaticProps,
} from "../../../helpers/prismic-static-props";
import type { Link, RichTextBlock } from "../../../lib/prismic-types";
import { CTABannerAlternateProps } from "../../../slices/CtaBanner";
import LearningModulesContext from "../../../src/context/LearningModulesContext";
import Section from "../../../src/layout/section/Section";
import GuideCard from "../../../src/molecules/guide-card/GuideCard";
import RichTextParser from "../../../src/molecules/rich-text-parser/RichTextParser";
import ApplicationSection from "../../../src/organisms/application-section/ApplicationSection";
import ModuleHero, {
  ModuleHeroProps,
} from "../../../src/organisms/module-hero/ModuleHero";
import Seo from "../../../src/organisms/seo/Seo";
import CustomType from "../../../types/CustomType";
import ImageProps from "../../../types/ImageProps";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";
import { AssessmentApplicationMainProps } from "./[assessment_application]";

interface GuideItem {
  guideTitle: RichTextBlock;
  guideDownloadLink: Link;
  guidePageLink: Link;
}

interface GuideGroup {
  items?: GuideItem[];
  primary: {
    guideGroupTitle?: RichTextBlock;
  };
}

export interface LearningModuleProps
  extends ModuleHeroProps, CTABannerAlternateProps {
  introduction?: RichTextBlock;
  bodyTitle?: string;
  parent?: Link;
  icon?: ImageProps;
  bodyShort?: RichTextBlock;
  guidesBody?: RichTextBlock;
  guidesTitle?: RichTextBlock;
  applicationsSectionTitle?: string;
  applicationsSectionIntroduction?: RichTextBlock;
  slices?: GuideGroup[];
  applications: AssessmentApplicationMainProps[];
}

type LearningModulePageProps = LearningModuleProps;

type PageProps = PageData<unknown, LearningModulePageProps>;

const Page: React.FC<PageProps> = ({ uid, data = {} }) => {
  const {
    title,
    introduction,
    bodyTitle,
    body,
    icon,
    guideDownload,
    guideLink,
    guidesBody,
    guidesTitle,
    applicationsSectionTitle,
    applicationsSectionIntroduction,
    slices,
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
  } = data;

  const learningModules = React.useContext(LearningModulesContext);

  const module = learningModules.find(
    (module: CustomType<LearningModuleProps>) => module.uid === uid,
  );

  return (
    <React.Fragment>
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage}
        openGraphTitle={openGraphTitle}
      />
      <ModuleHero
        uid={uid}
        title={title}
        body={introduction}
        guideDownload={guideDownload}
        guideLink={guideLink}
        icon={icon}
      />
      {(!!(body && isFilled.richText(body) && asText(body)) || bodyTitle) && (
        <Box pad={{ top: "xlarge", bottom: "medium" }}>
          <Section>
            {bodyTitle && (
              <Heading level={"1"} size={"small"} margin={{ bottom: "medium" }}>
                {bodyTitle}
              </Heading>
            )}
            {!!body?.length && <RichTextParser body={body} />}
          </Section>
        </Box>
      )}
      <Box pad={{ top: "xlarge", bottom: "xlarge" }}>
        <Section>
          {applicationsSectionTitle && (
            <Heading size={"small"}>{applicationsSectionTitle}</Heading>
          )}
          {!!applicationsSectionIntroduction?.length &&
            !!asText(applicationsSectionIntroduction) && (
              <Box margin={{ top: "medium" }} width={{ max: "850px" }}>
                <RichTextParser body={applicationsSectionIntroduction} />
              </Box>
            )}
          {module?.data?.applications &&
            module?.data?.applications.map((app, index) => (
              <ApplicationSection
                key={index}
                index={index}
                uid={app.uid}
                title={app.title}
                applicationsStats={app.applicationsStats}
                shortBody={app.shortBody}
                video={app.video}
                image={app.image}
                downloadLinks={app.downloadLinks}
                module={app.module}
                viewApplicationLink={app.viewApplicationLink}
              />
            ))}
        </Section>
      </Box>
      {!!slices?.length && (
        <Box width={"100%"} background={"light-1"}>
          <Section>
            <Box pad={{ top: "xlarge", bottom: "xlarge" }}>
              <Box pad={{ bottom: "large" }} width={{ max: "800px" }}>
                {guidesTitle && (
                  <Heading
                    level={"1"}
                    size={"small"}
                    margin={{ bottom: "medium" }}
                  >
                    {asText(guidesTitle)}
                  </Heading>
                )}
                {guidesBody && <Paragraph>{asText(guidesBody)}</Paragraph>}
              </Box>
              {slices &&
                slices.map(
                  (
                    { items, primary: { guideGroupTitle } }: GuideGroup,
                    index: number,
                  ) => (
                    <Box key={index} margin={{ top: "small" }}>
                      {guideGroupTitle && (
                        <Heading
                          level={"2"}
                          size={"small"}
                          margin={{ top: "small", bottom: "medium" }}
                        >
                          {asText(guideGroupTitle)}
                        </Heading>
                      )}
                      {items &&
                        items.map(
                          (
                            {
                              guideTitle,
                              guideDownloadLink,
                              guidePageLink,
                            }: GuideItem,
                            index: number,
                          ) => (
                            <GuideCard
                              key={index}
                              title={asText(guideTitle) ?? ""}
                              downloadLink={guideDownloadLink}
                              pageLink={guidePageLink}
                            />
                          ),
                        )}
                    </Box>
                  ),
                )}
            </Box>
          </Section>
        </Box>
      )}
    </React.Fragment>
  );
};

export const getStaticProps = createGetStaticProps({
  type: PageType.LEARNING_MODULE,
  uid: ({ learning_module }) => learning_module,
});

export const getStaticPaths = createGetStaticPaths({
  type: PageType.LEARNING_MODULE,
  formatPath: ({ uid }) => ({
    params: { learning_module: uid || "" },
  }),
});

export default Page;
