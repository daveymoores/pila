import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import React from "react";

import { createGetStaticPaths } from "../../helpers/prismic-static-props";
import { asSlices } from "../../lib/slices-helper";
import getStaticDetailProps from "../../next/get-static-props/detail";
import { components } from "../../slices";
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
        uid: params?.theme as string,
      },
      label: parent?.data?.title
        ? asText(parent.data.title)
        : "[THEME_PAGE_TITLE]",
    },
    {
      link: { type: PageType.DETAIL, uid: params?.detail as string },
      label: restProps.title ? asText(restProps.title) : "[DETAIL_PAGE_TITLE]",
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
      <SliceZone slices={asSlices(bannerSlices)} components={components} />
    </React.Fragment>
  );
};

export const getStaticProps = getStaticDetailProps<DetailPageProps>(
  PageType.DETAIL,
);

export const getStaticPaths = createGetStaticPaths({
  type: PageType.DETAIL,
  formatPath: (doc) => {
    const data = doc.data as { parent?: { uid?: string } };
    if (data?.parent?.uid) {
      return {
        params: { theme: data.parent.uid, detail: doc.uid || "" },
      };
    }
    return { params: { detail: doc.uid || "", theme: "" } };
  },
});

export default Page;
