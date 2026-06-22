import { SliceZone } from "@prismicio/react";
import React from "react";

import { createGetStaticProps } from "../helpers/prismic-static-props";
import { asSlices } from "../lib/slices-helper";
import { components } from "../slices";
import { FullWidthImageSectionProps } from "../slices/FullWidthImageSection";
import { HighlightBannerProps } from "../slices/HighlightBanner";
import { ImageWithTextSectionProps } from "../slices/ImageWithTextSection";
import {
  LearningModule,
  PoweredByResearchSectionProps,
} from "../slices/PoweredByResearchSection";
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

type PageProps = PageData<HomepageSlices, HomepageProps> & {
  learningModules: LearningModule[];
};

const Page: React.FC<PageProps> = ({
  data,
  slices,
  learningModules,
}: PageProps) => {
  const parsedSlices = slices.map((slice: HomepageSlices) => {
    if (slice.slice_type === SliceType.POWERED_BY_RESEARCH_SECTION) {
      return { ...slice, learningModules };
    }
    return slice;
  });

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
      <SliceZone slices={asSlices(parsedSlices)} components={components} />
    </React.Fragment>
  );
};

export const getStaticProps = createGetStaticProps({
  queryType: QueryType.SINGLE,
  type: PageType.HOME,
});

export default Page;
