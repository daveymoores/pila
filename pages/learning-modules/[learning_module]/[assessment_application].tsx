import { Box } from "grommet";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import React from "react";

import { ApplicationStats } from "../../../helpers/get-application-averages/getApplicationAverages";
import {
  createGetStaticPaths,
  createGetStaticProps,
} from "../../../helpers/prismic-static-props";
import {
  getLinkUid,
  type Link,
  type RichTextBlock,
} from "../../../lib/prismic-types";
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

export interface AssessmentApplicationMainProps extends CTABannerAlternateProps {
  title?: RichTextBlock;
  uid: string;
  applicationLinkLabel?: string;
  applicationLink?: Link;
  body?: RichTextBlock;
  shortBody?: RichTextBlock;
  video?: Link;
  image?: ImageProps;
  downloadLinks?: DownloadLink[];
  applicationsStats?: ApplicationStats;
  module?: Link;
  taskSectionTitle?: RichTextBlock;
  taskSectionIntroduction?: RichTextBlock;
  miscTaskSectionTitle?: RichTextBlock;
  miscTaskSectionIntroduction?: RichTextBlock;
  miscTaskSlices?: MiscTask[];
  viewApplicationLink: Link;
}

export interface MiscTask {
  items: { categories: Link & { data: { name: string } } }[];
  primary: {
    taskTitle: RichTextBlock;
    taskImage: ImageProps;
    taskVideo: Link;
    taskBody: RichTextBlock;
    startTaskButtonLabel: string;
    taskLink: Link;
  };
}

export interface Task {
  items: { categories: Link & { data: { name: string } } }[];
  primary: {
    taskTitle: RichTextBlock;
    taskImage: ImageProps;
    taskVideo: Link;
    taskBody: RichTextBlock;
    startTaskButtonLabel: string;
    taskLink: Link;
    taskDifficulty: Difficulty;
    taskLength: number;
    minimumAge: number;
    maximumAge: number;
  };
}

type AssessmentApplicationPageProps = AssessmentApplicationMainProps;

export interface AssessmentApplicationProps extends PageData<
  Task,
  AssessmentApplicationPageProps
> {
  learningModuleUid: string;
}

type PageProps = AssessmentApplicationProps;

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

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<PageProps>> => {
  const pageResult = await createGetStaticProps({
    type: PageType.ASSESSMENT_APPLICATION,
    uid: ({ assessment_application }) => assessment_application,
    params: {
      fetchLinks: ["category.name"],
    },
  })(context);

  if ("notFound" in pageResult && pageResult.notFound) {
    return pageResult;
  }

  return {
    props: {
      ...pageResult.props,
      learningModuleUid: String(context.params?.learning_module ?? ""),
    } as PageProps,
  };
};

export const getStaticPaths = createGetStaticPaths({
  type: PageType.ASSESSMENT_APPLICATION,
  formatPath: (doc) => {
    const data = doc.data as AssessmentApplicationMainProps;
    const moduleUid = getLinkUid(data?.module) ?? "";

    return {
      params: {
        assessment_application: doc.uid ?? "",
        learning_module: moduleUid,
      },
    };
  },
});

export default Page;
