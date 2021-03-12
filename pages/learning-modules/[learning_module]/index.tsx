import { Box, Heading, Paragraph } from "grommet";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { Client } from "../../../prismic";
import Section from "../../../src/layout/section/Section";
import GuideCard from "../../../src/molecules/GuideCard/GuideCard";
import ModuleHero, {
  ModuleHeroProps,
} from "../../../src/organisms/module-hero/ModuleHero";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";

interface GuideItem {
  guideTitle: RichTextBlock[];
  guideDownloadLink: Link;
  guidePageLink: Link;
}

interface GuideGroup {
  items: GuideItem[];
  primary: {
    guideGroupTitle: RichTextBlock[];
  };
}

interface LearningModuleHomeProps extends ModuleHeroProps {
  bodyShort: RichTextBlock[];
  guidesBody: RichTextBlock[];
  guidesTitle: RichTextBlock[];
  slices: GuideGroup[];
}

type PageProps = PageData<unknown, LearningModuleHomeProps> &
  JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = ({ uid, data, ...restProps }) => {
  const {
    title,
    body,
    guideDownload,
    guideLink,
    guidesBody,
    guidesTitle,
    slices,
  } = data;

  return (
    <React.Fragment>
      <ModuleHero
        uid={uid}
        title={title}
        body={body}
        guideDownload={guideDownload}
        guideLink={guideLink}
      />
      <Section>
        <Box pad={{ top: "xlarge", bottom: "xlarge" }}></Box>
      </Section>
      <Box width={"100%"} background={"light-1"}>
        <Section>
          <Box pad={{ top: "xlarge", bottom: "xlarge" }}>
            <Box pad={{ bottom: "large" }} width={{ max: "800px" }}>
              <Heading level={"1"} size={"small"} margin={{ bottom: "medium" }}>
                {RichText.asText(guidesTitle)}
              </Heading>
              <Paragraph>{RichText.asText(guidesBody)}</Paragraph>
            </Box>
            {slices.map(({ items, primary }, index) => (
              <Box key={index} margin={{ top: "small" }}>
                <Heading
                  level={"2"}
                  size={"small"}
                  margin={{ top: "small", bottom: "medium" }}
                >
                  {RichText.asText(primary.guideGroupTitle)}
                </Heading>
                {items.map(
                  ({ guideTitle, guideDownloadLink, guidePageLink }, index) => (
                    <GuideCard
                      key={index}
                      title={guideTitle}
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
