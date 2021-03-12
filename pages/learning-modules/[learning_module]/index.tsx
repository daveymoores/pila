import { Paragraph } from "grommet";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import { RichTextBlock } from "prismic-reactjs";
import React from "react";

import { Client } from "../../../prismic";
import Section from "../../../src/layout/section/Section";
import ModuleHero from "../../../src/organisms/module-hero/ModuleHero";
import ResponsiveGrid from "../../../src/organisms/responsive-grid/ResponsiveGrid";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";

interface LearningModuleHomeProps {
  title: RichTextBlock[];
}

type PageProps = PageData<unknown, LearningModuleHomeProps> &
  JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = ({ data, ...restProps }) => {
  const { title } = data;

  return (
    <Section>
      <ModuleHero title={title} />
      <ResponsiveGrid rows={"1"} columns={"large"}>
        <Paragraph>{JSON.stringify(restProps)}</Paragraph>
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