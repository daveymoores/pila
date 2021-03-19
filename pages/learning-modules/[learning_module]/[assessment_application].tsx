import { Paragraph } from "grommet";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import Prismic from "prismic-javascript";
import { Link, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { Client } from "../../../prismic";
import { LearningModule } from "../../../slices/PoweredByResearchSection";
import Section from "../../../src/layout/section/Section";
import ResponsiveGrid from "../../../src/organisms/responsive-grid/ResponsiveGrid";
import Seo from "../../../src/organisms/seo/Seo";
import CustomType from "../../../types/CustomType";
import ImageProps from "../../../types/ImageProps";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";
import parseLearningModules from "../../helpers/parseLearningModules";

enum Difficulty {
  EASY = "Easy",
  EASY_INTERMEDIATE = "Easy - Intermediate",
  INTERMEDIATE = "Intermediate",
  INTERMEDIATE_ADVANCED = "Intermediate - Advanced",
  ADVANCED = "Advanced",
}

interface AssessmentApplicationProps {
  title: RichTextBlock[];
  uid: string;
  applicationLink: Link;
  body: RichTextBlock[];
  shortBody: RichTextBlock[];
  video: Link;
  Image: ImageProps;
  downLoadLinks: {
    downloadLink: Link;
    link: Link;
  }[];
}

interface Slices {
  taskTitle: RichTextBlock[];
  image: ImageProps;
  videoLink: Link;
  taskBody: RichTextBlock[];
  taskLink: Link;
  difficulty: Difficulty;
  taskLength: number;
  minimumAge: number;
  maximumAge: number;
  categories: Link[];
}

type PageProps = PageData<Slices, AssessmentApplicationProps> &
  JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = ({ data, ...restProps }) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
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
      <Section>
        <ResponsiveGrid rows={"1"} columns={"large"}>
          <Paragraph>{JSON.stringify(restProps)}</Paragraph>
        </ResponsiveGrid>
      </Section>
    </React.Fragment>
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
