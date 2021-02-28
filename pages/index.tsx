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

type HomepageSlices = ImageWithTextSectionProps &
  HighlightBannerProps &
  FullWidthImageSectionProps &
  PoweredByResearchSectionProps &
  ThanksToInstitutionsSectionProps;

type PageProps = JSX.IntrinsicAttributes &
  PageData<HomepageSlices, HomepageHeroProps>;

const Page: React.FC<PageProps> = ({ data, slices }: PageProps) => {
  return (
    <React.Fragment>
      <HomepageHero {...data} />
      <SliceZone slices={slices} resolver={resolver} />
    </React.Fragment>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: QueryType.SINGLE,
  type: PageType.HOME,
});

export default Page;
