import { useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../../prismic";
import Seo from "../../src/organisms/seo/Seo";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";

type PageProps = PageData<unknown, unknown> & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = (props) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
  } = props.data || {};

  return (
    <Seo
      metaDescription={metaDescription}
      metaTitle={metaTitle}
      openGraphDescription={openGraphDescription}
      openGraphImage={openGraphImage}
      openGraphTitle={openGraphTitle}
    />
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: "single",
  type: PageType.LEARNING_MODULE_HOME,
});

export default Page;
