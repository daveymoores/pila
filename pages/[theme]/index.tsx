import { SliceZone } from "@prismicio/react";
import React from "react";

import {
  createGetStaticPaths,
  createGetStaticProps,
} from "../../helpers/prismic-static-props";
import { asSlices } from "../../lib/slices-helper";
import { components } from "../../slices";
import { ImageWithTextSectionProps } from "../../slices/ImageWithTextSection";
import HeroImage, {
  HeroImageProps,
} from "../../src/organisms/hero-image/HeroImage";
import Seo from "../../src/organisms/seo/Seo";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";

type ThemesPageSlices = ImageWithTextSectionProps;

type ThemesPageProps = HeroImageProps;

type PageProps = PageData<ThemesPageSlices, ThemesPageProps>;

const Page: React.FC<PageProps> = ({ data, slices }) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    ...restData
  } = data || {};

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
      <SliceZone slices={asSlices(slices)} components={components} />
    </React.Fragment>
  );
};

export const getStaticProps = createGetStaticProps({
  type: PageType.THEME,
  uid: ({ theme }) => theme || "",
});

export const getStaticPaths = createGetStaticPaths({
  type: PageType.THEME,
  formatPath: ({ uid }) => ({ params: { theme: uid || "" } }),
});

export default Page;
