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
import PageType from "../../types/PageTypes";

const Page: React.FC<DetailPageProps> = ({ data, slices, params }) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    parent,
    bannerSlices,
    ...restProps
  } = data || {};

  const breadcrumbLinks: BreadcrumbItem[] = [
    {
      link: {
        type: PageType.THEME,
        uid: params?.theme as Link["uid"],
      },
      label: parent?.data.title
        ? RichText.asText(parent?.data.title)
        : "[THEME_PAGE_TITLE]",
    },
    {
      link: { type: PageType.DETAIL, uid: params?.detail as Link["uid"] },
      label: restProps.title
        ? RichText.asText(restProps.title)
        : "[DETAIL_PAGE_TITLE]",
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
    theme: string;
    detail: string;
  };
}

export const getStaticProps = (context: StaticContextProps) =>
  getStaticDetailProps<StaticContextProps, DetailPageProps>(PageType.DETAIL)(
    context
  );

interface Params {
  params: {
    detail: string;
    theme?: string;
  };
}

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.DETAIL,
  fallback: false,
  formatPath: ({ uid, data }: DetailPageProps): Params => {
    if (data.parent?.uid) {
      return { params: { theme: data.parent.uid, detail: uid } };
    }
    // TODO - display 404 here
    return { params: { detail: uid } };
  },
});

export default Page;
