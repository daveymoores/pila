import { GetStaticPropsResult } from "next";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import { Link, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { ApplicationStats } from "../../../helpers/get-application-averages/getApplicationAverages";
import { Client } from "../../../prismic";
import { CtaBanner } from "../../../slices";
import { CTABannerAlternateProps } from "../../../slices/CtaBanner";
import useNotification from "../../../src/hooks/useNotification";
import { NotificationLinkedProps } from "../../../src/molecules/notification/Notification";
import ApplicationHero from "../../../src/organisms/application-hero/ApplicationHero";
import Seo from "../../../src/organisms/seo/Seo";
import TaskSection from "../../../src/organisms/task-section/TaskSection";
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
  applicationLink?: Link;
  body?: RichTextBlock[];
  shortBody?: RichTextBlock[];
  video?: Link;
  image?: ImageProps;
  downloadLinks?: {
    label?: string;
    downloadLink?: Link;
    link?: Link;
  }[];
  applicationsStats?: ApplicationStats;
  module?: Link;
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

type AssessmentApplicationPageProps = AssessmentApplicationMainProps &
  NotificationLinkedProps;

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
    ctaSectionTitle,
    ctaSectionButtonOneLink,
    ctaSectionButtonOneLabel,
    ctaSectionButtonTwoLink,
    ctaSectionButtonTwoLabel,
    notification,
  } = data || {};

  useNotification(notification);

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
      {ctaSectionTitle && (
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

export const getStaticProps = async (
  context: StaticContextProps
): Promise<GetStaticPropsResult<PageProps>> => {
  const { props } = await useGetStaticProps({
    client: Client(),
    type: PageType.ASSESSMENT_APPLICATION,
    uid: ({ params }) => params.assessment_application,
    params: {
      fetchLinks: [
        "category.name",
        "notification.body, notification.showGlobal",
      ],
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

      // TODO - display 404 here
      return {
        params: {
          assessment_application: uid,
        },
      };
    },
  })();
};

export default Page;
