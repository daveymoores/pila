import { Heading, Paragraph } from "grommet";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../../../prismic";
import Section from "../../../src/layout/section/Section";
import ResponsiveGrid from "../../../src/organisms/responsive-grid/ResponsiveGrid";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";

type PageProps = PageData<unknown, unknown> & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = (props) => {
  return (
    <Section>
      <ResponsiveGrid rows={"1"} columns={"large"}>
        <Heading>learning module Page</Heading>
        <Paragraph>{JSON.stringify(props)}</Paragraph>
      </ResponsiveGrid>
    </Section>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.LEARNING_MODULE,
  uid: ({ params }) => params.learning_module,
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.LEARNING_MODULE,
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { learning_module: uid } }),
});

export default Page;
