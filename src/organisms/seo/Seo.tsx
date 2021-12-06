import { NextSeo } from "next-seo";
import { OpenGraphImages } from "next-seo/lib/types";
import React from "react";

import ImageProps from "../../../types/ImageProps";

interface SeoImage extends ImageProps {
  ogFormatOne?: ImageProps;
  ogFormatTwo?: ImageProps;
}

export interface SeoMetaDataProps {
  metaTitle?: string;
  metaDescription?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: SeoImage;
}

interface SeoProps extends SeoMetaDataProps {
  path?: string;
}

const Seo: React.FC<SeoProps> = ({
  path,
  metaTitle,
  metaDescription,
  openGraphTitle,
  openGraphDescription,
  openGraphImage,
}) => {
  const { ogFormatOne, ogFormatTwo } = openGraphImage || {};

  let ogImages: OpenGraphImages[] = [];
  if (ogFormatOne?.url) {
    ogImages = [
      ...ogImages,
      {
        url: ogFormatOne.url,
        width: 800,
        height: 600,
        alt: ogFormatOne.alt || "",
      },
    ];
  }

  if (ogFormatTwo?.url) {
    ogImages = [
      ...ogImages,
      {
        url: ogFormatTwo.url,
        width: 800,
        height: 600,
        alt: ogFormatTwo.alt || "",
      },
    ];
  }

  return (
    <NextSeo
      title={metaTitle}
      description={metaDescription}
      openGraph={{
        url: path,
        title: openGraphTitle,
        description: openGraphDescription,
        images: ogImages,
        site_name: "PILA",
      }}
      twitter={{
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  );
};

export default Seo;
