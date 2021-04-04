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
import NotificationContext from "../src/context/NotificationContext";
import { useNavigationDarkTheme } from "../src/hooks/useNavigationTheme";
import {
  NotificationLinkedProps,
  NotificationProps,
} from "../src/molecules/notification/Notification";
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

type HomepageProps = HomepageHeroProps & NotificationLinkedProps;

type PageProps = JSX.IntrinsicAttributes &
  PageData<HomepageSlices, HomepageProps> & {
    learningModules: any;
  };

const Page: React.FC<PageProps> = ({
  data,
  slices,
  learningModules,
}: PageProps) => {
  const { setNotificationProps } = React.useContext(NotificationContext);

  const parsedSlices = slices.map((slice) => {
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
    notification,
    ...restData
  } = data;

  useNavigationDarkTheme();
  setNotificationProps(notification?.data);

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
      <SliceZone slices={parsedSlices} resolver={resolver} />
    </React.Fragment>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: QueryType.SINGLE,
  type: PageType.HOME,
  params: { fetchLinks: ["notification.body, notification.showGlobal"] },
});

export default Page;
