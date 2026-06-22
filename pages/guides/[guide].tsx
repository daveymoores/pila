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
      link: { type: PageType.GUIDE, uid: params?.guide as string },
      label: restProps.title ? asText(restProps.title) : "[GUIDE_PAGE_TITLE]",
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

export const getStaticProps = getStaticDetailProps<GuidePageProps>(
  PageType.GUIDE,
);

export const getStaticPaths = createGetStaticPaths({
  type: PageType.GUIDE,
  formatPath: ({ uid }) => ({ params: { guide: uid || "" } }),
});

export default Page;
