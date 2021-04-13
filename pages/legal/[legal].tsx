import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../../prismic";
import { CtaBanner } from "../../slices";
import { useNavigationLightTheme } from "../../src/hooks/useNavigationTheme";
import useNotification from "../../src/hooks/useNotification";
import HeroDetail from "../../src/organisms/hero-detail/HeroDetail";
import Seo from "../../src/organisms/seo/Seo";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";
import { GuidePageProps, GuidePageSlices } from "../guides/[guide]";

export type LegalPageSlices = GuidePageSlices;

export type LegalPageProps = GuidePageProps;

type PageProps = JSX.IntrinsicAttributes &
  PageData<LegalPageSlices, LegalPageProps>;

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
  type: PageType.LEGAL,
  uid: ({ params }) => params.legal,
  params: {
    fetchLinks: ["category.name", "notification.body, notification.showGlobal"],
  },
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.LEGAL,
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { legal: uid } }),
});

export default Page;
