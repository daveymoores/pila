import { SliceZone } from "@prismicio/react";
import type { GetStaticPropsContext } from "next";
import React from "react";

import { createGetStaticProps } from "../helpers/prismic-static-props";
import { resolveProgrammeCardsFromSliceItems } from "../helpers/resolve-programme-cards";
import { asSlices } from "../lib/slices-helper";
import { createClient } from "../prismicio";
import { components } from "../slices";
import { FullWidthImageSectionProps } from "../slices/FullWidthImageSection";
import { HighlightBannerProps } from "../slices/HighlightBanner";
import { ImageWithTextSectionProps } from "../slices/ImageWithTextSection";
import { PoweredByResearchSectionProps } from "../slices/PoweredByResearchSection";
import { ThanksToInstitutionsSectionProps } from "../slices/ThanksToInstitutionsSection";
import HomepageHero, {
  HomepageHeroProps,
} from "../src/organisms/homepage-hero/HomepageHero";
import Seo from "../src/organisms/seo/Seo";
import PageData from "../types/PageData";
import PageType from "../types/PageTypes";
import QueryType from "../types/QueryType";
import { SliceType } from "../types/Slice";

type HomepageSlices = ImageWithTextSectionProps &
  HighlightBannerProps &
  FullWidthImageSectionProps &
  PoweredByResearchSectionProps &
  ThanksToInstitutionsSectionProps;

type HomepageProps = HomepageHeroProps;

type PageProps = PageData<HomepageSlices, HomepageProps>;

const Page: React.FC<PageProps> = ({ data, slices }: PageProps) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    ...restData
  } = data;

  return (
    <React.Fragment>
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage}
        openGraphTitle={openGraphTitle}
      />
      <HomepageHero {...restData} />
      <SliceZone slices={asSlices(slices)} components={components} />
    </React.Fragment>
  );
};

const getHomeStaticProps = createGetStaticProps({
  queryType: QueryType.SINGLE,
  type: PageType.HOME,
});

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const pageResult = await getHomeStaticProps(context);

  if ("notFound" in pageResult && pageResult.notFound) {
    return pageResult;
  }

  if ("redirect" in pageResult && pageResult.redirect) {
    return pageResult;
  }

  const client = createClient({ previewData: context.previewData });
  const slices = (pageResult.props.slices || []) as HomepageSlices[];

  const enrichedSlices = await Promise.all(
    slices.map(async (slice) => {
      if (slice.slice_type !== SliceType.POWERED_BY_RESEARCH_SECTION) {
        return slice;
      }

      const programmeCards = await resolveProgrammeCardsFromSliceItems(
        client,
        slice.items,
      );

      return {
        ...slice,
        programmeCards,
      };
    }),
  );

  return {
    ...pageResult,
    props: {
      ...pageResult.props,
      slices: enrichedSlices,
    },
  };
};

export default Page;
