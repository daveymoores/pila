import { Heading } from "grommet";
import { Paragraph } from "grommet";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import Prismic from "prismic-javascript";
import React from "react";

import { Client } from "../../../prismic";
import { LearningModule } from "../../../slices/PoweredByResearchSection";
import Section from "../../../src/layout/section/Section";
import ResponsiveGrid from "../../../src/organisms/responsive-grid/ResponsiveGrid";
import CustomType from "../../../types/CustomType";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";
import parseLearningModules from "../../helpers/parseLearningModules";

type PageProps = PageData<unknown, unknown> & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = (props: JSX.IntrinsicAttributes) => {
  return (
    <Section>
      <ResponsiveGrid rows={"1"} columns={"large"}>
        <Heading>Assessment application</Heading>
        <Paragraph>{JSON.stringify(props)}</Paragraph>
      </ResponsiveGrid>
    </Section>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.ASSESSMENT_APPLICATION,
  uid: ({ params }) => params.assessment_application,
});

export const getStaticPaths = async () => {
  const client = Client();
  const modules =
    (await client.query(
      Prismic.Predicates.at("document.type", "learning_module"),
      {}
    )) || {};

  const moduleApplications = parseLearningModules(
    (modules.results as unknown) as CustomType<LearningModule>[]
  );

  return useGetStaticPaths({
    client: Client(),
    type: PageType.ASSESSMENT_APPLICATION,
    fallback: true, // process.env.NODE_ENV === 'development',
    formatPath: (props) => {
      const app = moduleApplications.find((module) =>
        module.applications.find((app) => app === props.uid)
      );

      return {
        params: {
          assessment_application: props.uid,
          learning_module: app?.module || "",
        },
      };
    },
  })();
};

export default Page;
