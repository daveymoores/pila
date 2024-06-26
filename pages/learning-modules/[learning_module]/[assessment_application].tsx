import { Box } from "grommet";
import { GetStaticPropsResult } from "next";
import { Params } from "next/dist/next-server/server/router";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import { Link, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { ApplicationStats } from "../../../helpers/get-application-averages/getApplicationAverages";
import { Client } from "../../../prismic";
import { CTABannerAlternateProps } from "../../../slices/CtaBanner";
import ApplicationHero from "../../../src/organisms/application-hero/ApplicationHero";
import Seo from "../../../src/organisms/seo/Seo";
import TaskSection from "../../../src/organisms/task-section/TaskSection";
import DownloadLink from "../../../types/DownloadLink";
import ImageProps from "../../../types/ImageProps";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";

export enum Difficulty {
  EASY = "Easy",
  EASY_INTERMEDIATE = "Easy - Intermediate",
  INTERMEDIATE = "Intermediate",
  INTERMEDIATE_ADVANCED = "Intermediate - Advanced",
  ADVANCED = "Advanced",
}

export interface AssessmentApplicationMainProps
  extends CTABannerAlternateProps {
  title?: RichTextBlock[];
  uid: string;
  applicationLinkLabel?: string;
  applicationLink?: Link;
  body?: RichTextBlock[];
  shortBody?: RichTextBlock[];
  video?: Link;
  image?: ImageProps;
  downloadLinks?: DownloadLink[];
  applicationsStats?: ApplicationStats;
  module?: Link;
  taskSectionTitle?: RichTextBlock[];
  taskSectionIntroduction?: RichTextBlock[];
  miscTaskSectionTitle?: RichTextBlock[];
  miscTaskSectionIntroduction?: RichTextBlock[];
  miscTaskSlices?: MiscTask[];
  viewApplicationLink: Link;
}

export interface MiscTask {
  items: { categories: Link & { data: { name: string } } }[];
  primary: {
    taskTitle: RichTextBlock[];
    taskImage: ImageProps;
    taskVideo: Link;
    taskBody: RichTextBlock[];
    startTaskButtonLabel: string;
    taskLink: Link;
  };
}

export interface Task {
  items: { categories: Link & { data: { name: string } } }[];
  primary: {
    taskTitle: RichTextBlock[];
    taskImage: ImageProps;
    taskVideo: Link;
    taskBody: RichTextBlock[];
    startTaskButtonLabel: string;
    taskLink: Link;
    taskDifficulty: Difficulty;
    taskLength: number;
    minimumAge: number;
    maximumAge: number;
  };
}

type AssessmentApplicationPageProps = AssessmentApplicationMainProps;

export interface AssessmentApplicationProps
  extends PageData<Task, AssessmentApplicationPageProps> {
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
    applicationLink,
    applicationLinkLabel,
    taskSectionTitle,
    taskSectionIntroduction,
    miscTaskSectionTitle,
    miscTaskSectionIntroduction,
    miscTaskSlices,
    downloadLinks,
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
      <ApplicationHero
        uid={uid}
        title={title}
        body={body}
        downloadLinks={downloadLinks}
        learningModuleUid={learningModuleUid}
        applicationLink={applicationLink}
        applicationLinkLabel={applicationLinkLabel}
      />
      {!!slices?.length || !!miscTaskSlices?.length ? (
        <Box responsive margin={{ top: "xlarge", bottom: "medium" }}>
          {!!slices?.length && (
            <TaskSection
              slices={slices}
              taskSectionTitle={taskSectionTitle}
              taskSectionIntroduction={taskSectionIntroduction}
            />
          )}
          {!!miscTaskSlices?.length && (
            <TaskSection
              slices={miscTaskSlices as Task[]}
              taskSectionTitle={miscTaskSectionTitle}
              taskSectionIntroduction={miscTaskSectionIntroduction}
            />
          )}
        </Box>
      ) : (
        <Box background={"light-1"} pad={"small"} responsive />
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

export const getStaticProps = async (
  context: StaticContextProps
): Promise<GetStaticPropsResult<PageProps>> => {
  const { props } = await useGetStaticProps({
    client: Client(),
    type: PageType.ASSESSMENT_APPLICATION,
    uid: ({ params }: Params) => params.assessment_application,
    params: {
      fetchLinks: ["category.name"],
    },
  })(context);

  return {
    props: { ...props, learningModuleUid: context.params.learning_module },
  };
};

export const getStaticPaths = async (): Promise<StaticContextProps> => {
  return useGetStaticPaths({
    client: Client(),
    type: PageType.ASSESSMENT_APPLICATION,
    fallback: false,
    formatPath: ({ uid, data }: PageProps): Params => {
      if (data.module?.uid) {
        return {
          params: {
            assessment_application: uid,
            learning_module: data.module.uid,
          },
        };
      }

      return {
        params: {
          assessment_application: uid,
        },
      };
    },
  })();
};

export default Page;
