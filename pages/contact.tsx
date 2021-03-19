import { Heading, Paragraph } from "grommet";
import { useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../prismic";
import Section from "../src/layout/section/Section";
import ResponsiveGrid from "../src/organisms/responsive-grid/ResponsiveGrid";
import Seo from "../src/organisms/seo/Seo";
import PageData from "../types/PageData";
import PageType from "../types/PageTypes";
import QueryType from "../types/QueryType";

type PageProps = PageData<unknown, unknown> & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = (props) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
  } = props.data;

  return (
    <Section>
      <ResponsiveGrid rows={"1"} columns={"large"}>
        <Seo
          metaDescription={metaDescription}
          metaTitle={metaTitle}
          openGraphDescription={openGraphDescription}
          openGraphImage={openGraphImage}
          openGraphTitle={openGraphTitle}
        />
        <Heading>Form Page</Heading>
        <Paragraph>{JSON.stringify(props)}</Paragraph>
      </ResponsiveGrid>
    </Section>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: QueryType.SINGLE,
  type: PageType.FORM,
});

export default Page;
