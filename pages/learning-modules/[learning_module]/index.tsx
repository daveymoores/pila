import { Box, Heading, Paragraph } from "grommet";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { Client } from "../../../prismic";
import { CtaBanner } from "../../../slices";
import { CTABannerAlternateProps } from "../../../slices/CtaBanner";
import LearningModulesContext from "../../../src/context/LearningModulesContext";
import Section from "../../../src/layout/section/Section";
import GuideCard from "../../../src/molecules/guide-card/GuideCard";
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

export interface LearningModuleProps
  extends ModuleHeroProps,
    CTABannerAlternateProps {
  parent?: Link;
  icon?: ImageProps;
  bodyShort?: RichTextBlock[];
  guidesBody?: RichTextBlock[];
  guidesTitle?: RichTextBlock[];
  slices?: GuideGroup[];
  applications: AssessmentApplicationMainProps[];
}

type LearningModulePageProps = LearningModuleProps;

type PageProps = PageData<unknown, LearningModulePageProps> &
  JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = ({ uid, data = {} }) => {
  const {
    title,
    body,
    icon,
    guideDownload,
    guideLink,
    guidesBody,
    guidesTitle,
    ctaSectionTitle,
    ctaSectionButtonOneLabel,
    ctaSectionButtonOneLink,
    ctaSectionButtonTwoLabel,
    ctaSectionButtonTwoLink,
    slices,
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
  } = data;

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
        icon={icon}
      />
      <Box pad={{ top: "xlarge", bottom: "xlarge" }}>
        <Section>
          <Heading size={"small"}>Assessment applications</Heading>
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
              />
            ))}
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
      {ctaSectionTitle && ctaSectionButtonOneLink && ctaSectionButtonOneLabel && (
        <CtaBanner
          slice={{
            primary: {
              title: ctaSectionTitle,
              buttonOneLink: ctaSectionButtonOneLink,
              buttonOneLabel: ctaSectionButtonOneLabel,
              buttonTwoLink: ctaSectionButtonTwoLink,
              buttonTwoLabel: ctaSectionButtonTwoLabel,
            },
          }}
        />
      )}
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
  fallback: false,
  formatPath: ({ uid }) => ({ params: { learning_module: uid } }),
});

export default Page;
