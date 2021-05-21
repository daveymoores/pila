import { Box, Heading } from "grommet";
import { GetStaticPropsResult } from "next";
import { useGetStaticProps } from "next-slicezone/hooks";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import React from "react";

import { Client } from "../../prismic";
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
import PrismicResponse from "../../types/PrismicResponse";
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
            {RichText.asText(title)}
          </Heading>
        }
        variant={Theme.LIGHT}
      />
      <Section>
        <Box margin={{ bottom: "xlarge" }}>
          {props.guides.map((guide, index) => (
            <GuideCard
              key={index}
              title={RichText.asText(guide.data.title)}
              guideCategory={guide.data?.guide_category.data.title}
              pageLink={{ uid: guide.uid, type: guide.type, url: guide.url }}
            />
          ))}
        </Box>
      </Section>
    </Box>
  );
};

interface StaticContextProps {
  params: Record<string, unknown>;
}

export const getStaticProps = async (
  context: StaticContextProps
): Promise<GetStaticPropsResult<DetailPageProps>> => {
  const client = Client();
  let data;

  try {
    data =
      (((await client.query(
        Prismic.Predicates.any("document.type", ["guide"]),
        {
          fetchLinks: ["guide_category.title"],
          orderings: "[document.first_publication_date]",
        }
      )) as unknown) as PrismicResponse<DetailPageProps>) || {};
  } catch (err) {
    throw new Error(err);
  }

  const { props } = await useGetStaticProps({
    client: Client(),
    queryType: QueryType.SINGLE,
    type: PageType.GUIDE_HOME,
  })(context);

  return { props: { ...props, guides: data.results, slices: null } };
};

export default Page;
