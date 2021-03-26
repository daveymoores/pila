import { Box, Heading, Paragraph } from "grommet";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { Client } from "../../../prismic";
import LearningModulesContext from "../../../src/context/LearningModulesContext";
import { useNavigationLightTheme } from "../../../src/hooks/useNavigationTheme";
import Section from "../../../src/layout/section/Section";
import GuideCard from "../../../src/molecules/GuideCard/GuideCard";
import ApplicationSection from "../../../src/organisms/application-section/ApplicationSection";
import ModuleHero, {
  ModuleHeroProps,
} from "../../../src/organisms/module-hero/ModuleHero";
import Seo from "../../../src/organisms/seo/Seo";
import CustomType from "../../../types/CustomType";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";
import { AssessmentApplicationMainProps } from "./[assessment_application]";

interface GuideItem {
  guideTitle: RichTextBlock[];
  guideDownloadLink: Link;
  guidePageLink: Link;
}

interface GuideGroup {
  items?: GuideItem[];
  primary: {
    guideGroupTitle?: RichTextBlock[];
  };
}

export interface LearningModuleProps extends ModuleHeroProps {
  bodyShort?: RichTextBlock[];
  guidesBody?: RichTextBlock[];
  guidesTitle?: RichTextBlock[];
  slices?: GuideGroup[];
  applications: {
    assessmentApplication: AssessmentApplicationMainProps;
  }[];
}

type PageProps = PageData<unknown, LearningModuleProps> &
  JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = ({ uid, data = {} }) => {
  const {
    title,
    body,
    guideDownload,
    guideLink,
    guidesBody,
    guidesTitle,
    slices,
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
  } = data;

  useNavigationLightTheme();
  const learningModules = React.useContext(LearningModulesContext);

  const module = learningModules.find(
    (module: CustomType<LearningModuleProps>) => module.uid === uid
  );

  return (
    <React.Fragment>
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage || {}}
        openGraphTitle={openGraphTitle}
      />
      <ModuleHero
        uid={uid}
        title={title}
        body={body}
        guideDownload={guideDownload}
        guideLink={guideLink}
      />
      <Box pad={{ top: "xlarge", bottom: "xlarge" }}>
        <Section>
          <Heading size={"small"}>Assessment applications</Heading>
          {module?.data?.applications &&
            module?.data?.applications.map(
              ({ assessmentApplication: app }, index) => (
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
                />
              )
            )}
        </Section>
      </Box>
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
                  {RichText.asText(guidesTitle)}
                </Heading>
              )}
              {guidesBody && (
                <Paragraph>{RichText.asText(guidesBody)}</Paragraph>
              )}
            </Box>
            {slices &&
              slices.map(({ items, primary: { guideGroupTitle } }, index) => (
                <Box key={index} margin={{ top: "small" }}>
                  {guideGroupTitle && (
                    <Heading
                      level={"2"}
                      size={"small"}
                      margin={{ top: "small", bottom: "medium" }}
                    >
                      {RichText.asText(guideGroupTitle)}
                    </Heading>
                  )}
                  {items &&
                    items.map(
                      (
                        { guideTitle, guideDownloadLink, guidePageLink },
                        index
                      ) => (
                        <GuideCard
                          key={index}
                          title={RichText.asText(guideTitle)}
                          downloadLink={guideDownloadLink}
                          pageLink={guidePageLink}
                        />
                      )
                    )}
                </Box>
              ))}
          </Box>
        </Section>
      </Box>
    </React.Fragment>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.LEARNING_MODULE,
  uid: ({ params }) => params.learning_module,
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.LEARNING_MODULE,
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { learning_module: uid } }),
});

export default Page;
