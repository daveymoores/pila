import NextHead from "next/head";
import { generateDefaultSeo } from "next-seo/pages";
import React from "react";

interface HeadProps {
  title?: string;
  description?: string;
  url?: string;
  site_name?: string;
  handle?: string;
  appId?: string;
}

const Head: React.FC<HeadProps> = ({
  title,
  description,
  url,
  site_name,
  handle,
  appId,
}) => (
  <React.Fragment>
    <NextHead>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#1d2430" />
      <meta name="theme-color" content="#ffffff" />
      {generateDefaultSeo({
        title,
        description,
        openGraph: {
          type: "website",
          locale: "en_GB",
          url,
          site_name,
        },
        twitter: {
          handle,
          site: "@site",
          cardType: "summary_large_image",
        },
        facebook: {
          appId: appId || "",
        },
      })}
    </NextHead>
  </React.Fragment>
);

export default Head;
