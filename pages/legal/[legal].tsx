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

// TODO - add missing slices here
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
    </React.Fragment>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.DETAIL,
  uid: ({ params }) => params.detail,
  params: { fetchLinks: ["notification.body, notification.showGlobal"] },
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.DETAIL,
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { detail: uid } }),
});

export default Page;
