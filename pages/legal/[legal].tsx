import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import { Link, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { Client } from "../../prismic";
import { CtaBannerProps } from "../../slices/CtaBanner";
import { HighlightBannerProps } from "../../slices/HighlightBanner";
import { RichTextSectionProps } from "../../slices/RichTextSection";
import { useNavigationLightTheme } from "../../src/hooks/useNavigationTheme";
import useNotification from "../../src/hooks/useNotification";
import { NotificationLinkedProps } from "../../src/molecules/notification/Notification";
import HeroDetail from "../../src/organisms/hero-detail/HeroDetail";
import Seo from "../../src/organisms/seo/Seo";
import ImageProps from "../../types/ImageProps";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";

export type DetailPageSlices = CtaBannerProps &
  HighlightBannerProps &
  RichTextSectionProps;

export type DetailPageProps = NotificationLinkedProps & {
  title?: RichTextBlock[];
  heroImage?: ImageProps;
  category: { categories: Link & { data: { name: string } } };
  associatedContent: Link[];
};

type PageProps = JSX.IntrinsicAttributes &
  PageData<DetailPageSlices, DetailPageProps>;

const Page: React.FC<PageProps> = ({ data, slices }) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    notification,
    ...restProps
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
      <HeroDetail {...restProps} slices={slices} />
    </React.Fragment>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.LEGAL,
  uid: ({ params }) => params.legal,
  params: {
    fetchLinks: ["category.name", "notification.body, notification.showGlobal"],
  },
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.DETAIL,
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { legal: uid } }),
});

export default Page;
