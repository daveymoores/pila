import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import { Link, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { Client } from "../../prismic";
import { CtaBanner } from "../../slices";
import { AccordionBlockProps } from "../../slices/AccordionBlock";
import { CTABannerAlternateProps } from "../../slices/CtaBanner";
import { ImageBlockProps } from "../../slices/ImageBlock";
import { RichTextBlokProps } from "../../slices/RichTextBlock";
import { useNavigationLightTheme } from "../../src/hooks/useNavigationTheme";
import useNotification from "../../src/hooks/useNotification";
import { NotificationLinkedProps } from "../../src/molecules/notification/Notification";
import HeroDetail from "../../src/organisms/hero-detail/HeroDetail";
import Seo from "../../src/organisms/seo/Seo";
import ImageProps from "../../types/ImageProps";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";

export type GuidePageSlices = RichTextBlokProps &
  ImageBlockProps &
  AccordionBlockProps;

export type GuidePageProps = CTABannerAlternateProps &
  NotificationLinkedProps & {
    title?: RichTextBlock[];
    heroImage?: ImageProps;
    category: { categories: Link & { data: { name: string } } };
    associatedContent: Link[];
  };

type PageProps = JSX.IntrinsicAttributes &
  PageData<GuidePageSlices, GuidePageProps>;

const Page: React.FC<PageProps> = ({ data, slices }) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    ctaSectionTitle,
    ctaSectionButtonOneLink,
    ctaSectionButtonOneLabel,
    ctaSectionButtonTwoLink,
    ctaSectionButtonTwoLabel,
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
      {ctaSectionTitle && (
        <CtaBanner
          slice={{
            primary: {
              title: ctaSectionTitle,
              buttonOneLink: ctaSectionButtonOneLink,
              buttonOneLabel: ctaSectionButtonOneLabel,
              buttonTwoLink: ctaSectionButtonTwoLink,
              buttonTwoLabel: ctaSectionButtonTwoLabel,
            },
          }}
        />
      )}
    </React.Fragment>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.GUIDE,
  uid: ({ params }) => params.guide,
  params: {
    fetchLinks: ["category.name", "notification.body, notification.showGlobal"],
  },
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.GUIDE,
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { guide: uid } }),
});

export default Page;
