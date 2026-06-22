import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
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

  const ogImages = [];
  if (ogFormatOne?.url) {
    ogImages.push({
      url: ogFormatOne.url,
      width: 800,
      height: 600,
      alt: ogFormatOne.alt || "",
    });
  }

  if (ogFormatTwo?.url) {
    ogImages.push({
      url: ogFormatTwo.url,
      width: 800,
      height: 600,
      alt: ogFormatTwo.alt || "",
    });
  }

  return (
    <Head>
      {generateNextSeo({
        title: metaTitle,
        description: metaDescription,
        openGraph: {
          url: path,
          title: openGraphTitle,
          description: openGraphDescription,
          images: ogImages,
          site_name: "PILA",
        },
        twitter: {
          site: "@site",
          cardType: "summary_large_image",
        },
      })}
    </Head>
  );
};

export default Seo;
