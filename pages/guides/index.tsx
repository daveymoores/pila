import { asText } from "@prismicio/client";
import { Box, Heading } from "grommet";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import React from "react";

import { createGetStaticProps } from "../../helpers/prismic-static-props";
import { createClient } from "../../prismicio";
import Section from "../../src/layout/section/Section";
import GuideCard from "../../src/molecules/guide-card/GuideCard";
import HeroText from "../../src/organisms/hero-text/HeroText";
import Seo from "../../src/organisms/seo/Seo";
import DetailPageProps, {
  DetailPageSlices,
  LinkedDetailPageProps,
} from "../../types/Detail";
import GuidePageProps from "../../types/Guide";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";
import QueryType from "../../types/QueryType";
import { Theme } from "../../types/Theme";

type GuidesPageProps = PageData<DetailPageSlices, LinkedDetailPageProps> & {
  guides: GuidePageProps[];
};

const Page: React.FC<GuidesPageProps> = (props) => {
  const {
    title,
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
  } = props.data || {};

  return (
    <Box
      width={"100%"}
      background={"light-1"}
      pad={{
        bottom: "xlarge",
      }}
    >
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage}
        openGraphTitle={openGraphTitle}
      />
      <HeroText
        title={
          <Heading
            textAlign={"start"}
            level={"1"}
            alignSelf={"stretch"}
            size="small"
          >
            {asText(title)}
          </Heading>
        }
        variant={Theme.LIGHT}
      />
      <Section>
        <Box margin={{ bottom: "xlarge" }}>
          {props.guides.map((guide, index) => (
            <GuideCard
              key={index}
              title={asText(guide.data?.title)}
              guideCategory={guide.data?.guide_category?.data?.title}
              pageLink={{ uid: guide.uid, type: guide.type, url: guide.url }}
            />
          ))}
        </Box>
      </Section>
    </Box>
  );
};

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<DetailPageProps>> => {
  const client = createClient({ previewData: context.previewData });
  const guides = await client.getAllByType(PageType.GUIDE, {
    fetchLinks: ["guide_category.title"],
    orderings: [{ field: "document.first_publication_date", direction: "asc" }],
  });

  const pageResult = await createGetStaticProps({
    queryType: QueryType.SINGLE,
    type: PageType.GUIDE_HOME,
  })(context);

  if ("notFound" in pageResult && pageResult.notFound) {
    return pageResult;
  }

  return {
    props: {
      ...pageResult.props,
      guides,
      slices: null,
    } as unknown as DetailPageProps,
  };
};

export default Page;
