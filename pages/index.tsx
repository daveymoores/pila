import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../prismic";
import { FullWidthImageSectionProps } from "../slices/FullWidthImageSection";
import { HighlightBannerProps } from "../slices/HighlightBanner";
import { ImageWithTextSectionProps } from "../slices/ImageWithTextSection";
import { PoweredByResearchSectionProps } from "../slices/PoweredByResearchSection";
import { ThanksToInstitutionsSectionProps } from "../slices/ThanksToInstitutionsSection";
import resolver from "../sm-resolver.js";
import HomepageHero, {
  HomepageHeroProps,
} from "../src/organisms/homepage-hero/HomepageHero";
import PageData from "../types/PageData";
import PageType from "../types/PageTypes";
import QueryType from "../types/QueryType";
import { SliceType } from "../types/Slice";

type HomepageSlices = ImageWithTextSectionProps &
  HighlightBannerProps &
  FullWidthImageSectionProps &
  PoweredByResearchSectionProps &
  ThanksToInstitutionsSectionProps;

type PageProps = JSX.IntrinsicAttributes &
  PageData<HomepageSlices, HomepageHeroProps> & {
    learningModules: any;
  };

const Page: React.FC<PageProps> = ({
  data,
  slices,
  learningModules,
}: PageProps) => {
  const parsedSlices = slices.map((slice) => {
    if (slice.slice_type === SliceType.POWERED_BY_RESEARCH_SECTION) {
      return { ...slice, learningModules };
    }
    return slice;
  });

  return (
    <React.Fragment>
      <HomepageHero {...data} />
      <SliceZone slices={parsedSlices} resolver={resolver} />
    </React.Fragment>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: QueryType.SINGLE,
  type: PageType.HOME,
});

export default Page;
