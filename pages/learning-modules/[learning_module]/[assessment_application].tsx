import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import Prismic from "prismic-javascript";
import { Link, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { ApplicationStats } from "../../../helpers/get-application-averages/getApplicationAverages";
import { Client } from "../../../prismic";
import { CtaBanner } from "../../../slices";
import { CTABannerAlternateProps } from "../../../slices/CtaBanner";
import { useNavigationLightTheme } from "../../../src/hooks/useNavigationTheme";
import ApplicationHero from "../../../src/organisms/application-hero/ApplicationHero";
import Seo from "../../../src/organisms/seo/Seo";
import TaskSection from "../../../src/organisms/task-section/TaskSection";
import CustomType from "../../../types/CustomType";
import ImageProps from "../../../types/ImageProps";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";
import parseLearningModules from "../../helpers/parseLearningModules";
import { LearningModuleProps } from "./index";

export enum Difficulty {
  EASY = "Easy",
  EASY_INTERMEDIATE = "Easy - Intermediate",
  INTERMEDIATE = "Intermediate",
  INTERMEDIATE_ADVANCED = "Intermediate - Advanced",
  ADVANCED = "Advanced",
}

export interface AssessmentApplicationMainProps
  extends CTABannerAlternateProps {
  title: RichTextBlock[];
  uid: string;
  applicationLink: Link;
  body: RichTextBlock[];
  shortBody: RichTextBlock[];
  video: Link;
  image: ImageProps;
  downloadLinks: {
    label: string;
    downloadLink: Link;
    link: Link;
  }[];
  applicationsStats: ApplicationStats;
}

export interface Task {
  items: { categories: Link & { data: { name: string } } }[];
  primary: {
    taskTitle: RichTextBlock[];
    taskImage: ImageProps;
    videoLink: Link;
    taskBody: RichTextBlock[];
    taskLink: Link;
    taskDifficulty: Difficulty;
    taskLength: number;
    minimumAge: number;
    maximumAge: number;
  };
}

export interface AssessmentApplicationProps
  extends PageData<Task, AssessmentApplicationMainProps> {
  learningModuleUid: string;
}

type PageProps = AssessmentApplicationProps & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = ({ data, learningModuleUid, uid }) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    title,
    body,
    slices,
    ctaSectionTitle,
    ctaSectionButtonOneLink,
    ctaSectionButtonOneLabel,
    ctaSectionButtonTwoLink,
    ctaSectionButtonTwoLabel,
  } = data || {};

  useNavigationLightTheme();

  return (
    <React.Fragment>
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage}
        openGraphTitle={openGraphTitle}
      />
      <ApplicationHero
        uid={uid}
        title={title}
        body={body}
        learningModuleUid={learningModuleUid}
      />
      <TaskSection slices={slices} />
      {ctaSectionTitle && ctaSectionButtonOneLink && ctaSectionButtonOneLabel && (
        <CtaBanner
          slice={{
            primary: {
              title: ctaSectionTitle,
              buttonOneLink: ctaSectionButtonOneLink,
              buttonOneLabel: ctaSectionButtonOneLabel,
              buttonTwoLink: ctaSectionButtonTwoLink,
              buttonTwoLabel: ctaSectionButtonTwoLabel,
            },
          }}
        />
      )}
    </React.Fragment>
  );
};

interface StaticContextProps {
  params: {
    assessment_application: string;
    learning_module: string;
  };
}

export const getStaticProps = async (context: StaticContextProps) => {
  const { props } = await useGetStaticProps({
    client: Client(),
    type: PageType.ASSESSMENT_APPLICATION,
    uid: ({ params }) => params.assessment_application,
    params: { fetchLinks: ["category.name", "notification.body"] },
  })(context);

  return {
    props: { ...props, learningModuleUid: context.params.learning_module },
  };
};

export const getStaticPaths = async (): Promise<StaticContextProps> => {
  const client = Client();
  const modules =
    (await client.query(
      Prismic.Predicates.at("document.type", "learning_module"),
      {}
    )) || {};

  const moduleApplications = parseLearningModules(
    (modules.results as unknown) as CustomType<LearningModuleProps>[]
  );

  return useGetStaticPaths({
    client: Client(),
    type: PageType.ASSESSMENT_APPLICATION,
    fallback: true, // process.env.NODE_ENV === 'development',
    formatPath: (props) => {
      const app = moduleApplications.find((module) =>
        (module?.applications || []).find((app) => app === props.uid)
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
