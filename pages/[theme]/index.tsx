import SliceZone from "next-slicezone";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../../prismic";
import { ImageWithTextSectionProps } from "../../slices/ImageWithTextSection";
import resolver from "../../sm-resolver.js";
import { useNavigationLightTheme } from "../../src/hooks/useNavigationTheme";
import useNotification from "../../src/hooks/useNotification";
import { NotificationLinkedProps } from "../../src/molecules/notification/Notification";
import HeroImage, {
  HeroImageProps,
} from "../../src/organisms/hero-image/HeroImage";
import Seo from "../../src/organisms/seo/Seo";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";

// TODO - add missing prismic here
type ThemesPageSlices = ImageWithTextSectionProps;

type ThemesPageProps = HeroImageProps & NotificationLinkedProps;

type PageProps = JSX.IntrinsicAttributes &
  PageData<ThemesPageSlices, ThemesPageProps>;

const Page: React.FC<PageProps> = ({ data, slices }) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    notification,
    ...restData
  } = data || {};

  useNotification(notification);
  useNavigationLightTheme();

  return (
    <React.Fragment>
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage}
        openGraphTitle={openGraphTitle}
      />
      <HeroImage {...restData} />
      <SliceZone slices={slices} resolver={resolver} />
    </React.Fragment>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.THEME,
  uid: ({ params }) => params.theme,
  params: { fetchLinks: ["notification.body, notification.showGlobal"] },
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.THEME,
  fallback: false,
  formatPath: ({ uid }) => ({ params: { theme: uid } }),
});

export default Page;
