import SliceZone from "next-slicezone";
import { useGetStaticPaths } from "next-slicezone/hooks";
import { Link, RichText } from "prismic-reactjs";
import React from "react";

import getStaticDetailProps from "../../next/get-static-props/detail";
import { Client } from "../../prismic";
import resolver from "../../sm-resolver";
import { BreadcrumbItem } from "../../src/molecules/breadcrumb/breadcrumb";
import HeroDetail from "../../src/organisms/hero-detail/HeroDetail";
import Seo from "../../src/organisms/seo/Seo";
import DetailPageProps from "../../types/Detail";
import GuidePageProps from "../../types/Guide";
import PageType from "../../types/PageTypes";

const Page: React.FC<GuidePageProps> = ({ data, slices, params }) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    bannerSlices,
    ...restProps
  } = data || {};

  const breadcrumbLinks: BreadcrumbItem[] = [
    {
      link: {
        type: PageType.GUIDE_HOME,
        uid: "guides_home",
      },
      label: "Guides",
    },
    {
      link: { type: PageType.GUIDE, uid: params?.guide as Link["uid"] },
      label: restProps.title
        ? RichText.asText(restProps.title)
        : "[GUIDE_PAGE_TITLE]",
    },
  ];

  return (
    <React.Fragment>
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage}
        openGraphTitle={openGraphTitle}
      />
      <HeroDetail
        {...restProps}
        breadcrumbLinks={breadcrumbLinks}
        slices={slices}
      />
      <SliceZone slices={bannerSlices} resolver={resolver} />
    </React.Fragment>
  );
};

interface StaticContextProps {
  params: {
    guide: string;
  };
}

export const getStaticProps = (context: StaticContextProps) =>
  getStaticDetailProps<StaticContextProps, DetailPageProps>(PageType.GUIDE)(
    context
  );

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.GUIDE,
  fallback: false,
  formatPath: ({ uid }) => ({ params: { guide: uid } }),
});

export default Page;
