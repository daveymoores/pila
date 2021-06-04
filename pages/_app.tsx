// pages/_app.js
import "../styles/globals.css";

import { Box } from "grommet";
import { NextPage } from "next";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import Prismic from "prismic-javascript";
import React from "react";
import CookieNotice from "react-cookienotice";
import styled from "styled-components";

import getApplicationAverages from "../helpers/get-application-averages/getApplicationAverages";
import { AuthProvider } from "../lib/auth";
import { Client } from "../prismic";
import PreviewCard from "../src/atoms/preview-card/PreviewCard";
import AssessmentApplicationContext from "../src/context/AssessmentApplicationContext";
import {
  DictionaryProps,
  DictionaryProvider,
} from "../src/context/DictionaryContext";
import LearningModulesContext from "../src/context/LearningModulesContext";
import { NotificationProvider } from "../src/context/NotificationContext";
import OffCanvasContext from "../src/context/OffCanvasContext";
import { NotificationProps } from "../src/molecules/notification/Notification";
import { DoormatProps } from "../src/organisms/doormat/Doormat";
import { FooterProps } from "../src/organisms/footer/Footer";
import { NavigationProps } from "../src/organisms/navigation/Navigation";
import Scaffold from "../src/organisms/scaffold/Scaffold";
import PilaTheme from "../src/theme/PilaTheme/PilaTheme";
import CustomType from "../types/CustomType";
import PageType from "../types/PageTypes";
import PrismicResponse from "../types/PrismicResponse";
import { LearningModuleProps } from "./learning-modules/[learning_module]";
import { AssessmentApplicationProps } from "./learning-modules/[learning_module]/[assessment_application]";

interface DefaultSeoProps {
  url: string;
  title: string;
  description: string;
  site_name: string;
  handle: string;
  appId: string;
}

export interface PageProps {
  assessmentApplications: CustomType<AssessmentApplicationProps>[] | [];
  learningModules: CustomType<LearningModuleProps>[] | [];
  notification: CustomType<NotificationProps>[] | [];
  dictionary: CustomType<DictionaryProps>[] | [];
  navigation: CustomType<NavigationProps>[] | [];
  doormat: CustomType<DoormatProps>[] | [];
  footer: CustomType<FooterProps>[] | [];
  seo: CustomType<DefaultSeoProps>[] | [];
}

type Response = PrismicResponse<
  LearningModuleProps &
    NavigationProps &
    DoormatProps &
    FooterProps &
    DefaultSeoProps &
    AssessmentApplicationProps &
    DictionaryProps
>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PilaApp: NextPage<AppProps<PageProps>> = (props) => {
  const { Component, pageProps } = props;

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { url, site_name, handle, appId, title, description } =
    (pageProps.seo || [])[0]?.data || {};

  // calculate averages for difficulty and age, plus total number of tasks
  const assessmentApplicationAverages = getApplicationAverages(
    (pageProps?.assessmentApplications as CustomType<AssessmentApplicationProps>[]) ||
      []
  );

  const learningModules: CustomType<LearningModuleProps>[] = (
    (pageProps?.learningModules as CustomType<LearningModuleProps>[]) || []
  ).map((learningModule) => {
    const applications = (pageProps?.assessmentApplications || []).reduce(
      (
        acc: CustomType<AssessmentApplicationProps>[],
        application: CustomType<AssessmentApplicationProps>
      ) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (application.data?.module.uid === learningModule.uid) {
          const applicationsStats = assessmentApplicationAverages.find(
            (app) => app.uid === application.uid
          );

          return [
            ...acc,
            {
              ...application.data,
              uid: application.uid,
              applicationsStats,
            },
          ];
        }

        return acc;
      },
      []
    );

    return {
      ...learningModule,
      data: { ...learningModule.data, applications },
    };
  });

  return (
    <AuthProvider>
      <OffCanvasContext.Provider
        value={{
          isOpen,
          setIsOpen: setIsOpen,
        }}
      >
        <DictionaryProvider dictionaryValues={pageProps.dictionary}>
          <NotificationProvider notifications={pageProps.notification}>
            <LearningModulesContext.Provider value={learningModules}>
              <AssessmentApplicationContext.Provider
                value={pageProps?.assessmentApplication}
              >
                <Head>
                  <script
                    async
                    defer
                    src="https://static.cdn.prismic.io/prismic.js?new=true&repo=pila"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                  />
                  <link rel="manifest" href="/site.webmanifest" />
                  <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                  />
                  <meta name="msapplication-TileColor" content="#1d2430" />
                  <meta name="theme-color" content="#ffffff" />
                </Head>
                <DefaultSeo
                  title={title}
                  description={description}
                  openGraph={{
                    type: "website",
                    locale: "en_GB",
                    url,
                    site_name,
                  }}
                  twitter={{
                    handle,
                    site: "@site",
                    cardType: "summary_large_image",
                  }}
                  facebook={{
                    appId,
                  }}
                />
                <PilaTheme userAgent={pageProps.userAgent}>
                  <Scaffold
                    navigation={(pageProps?.navigation || [])[0]?.data}
                    doormat={(pageProps?.doormat || [])[0]?.data}
                    footer={(pageProps?.footer || [])[0]?.data}
                  >
                    <Component {...pageProps} />
                  </Scaffold>
                  {process.browser && (
                    <StyledBox>
                      <CookieNotice darkTheme={false} />
                    </StyledBox>
                  )}
                  {pageProps.isPreview && <PreviewCard />}
                </PilaTheme>
              </AssessmentApplicationContext.Provider>
            </LearningModulesContext.Provider>
          </NotificationProvider>
        </DictionaryProvider>
      </OffCanvasContext.Provider>
    </AuthProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
PilaApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const userAgent = appContext.ctx.req?.headers["user-agent"];
  const client = Client();
  let data;

  try {
    data =
      (((await client.query(
        Prismic.Predicates.any("document.type", [
          "assessment_application",
          "learning_module",
          "notification",
          "dictionary",
          "navigation",
          "doormat",
          "footer",
          "seo",
        ]),
        {
          fetchLinks: ["document.slug", "document.type"],
          orderings: "[document.first_publication_date]",
        }
      )) as unknown) as Response) || {};
  } catch (err) {
    throw new Error(err);
  }

  const sortedResults = data.results.reduce(
    (acc: PageProps, result): PageProps => {
      switch (result.type) {
        case PageType.SEO:
          return { ...acc, seo: [...acc.seo, result] };
        case PageType.FOOTER:
          return { ...acc, footer: [...acc.footer, result] };
        case PageType.DOORMAT:
          return { ...acc, doormat: [...acc.doormat, result] };
        case PageType.NAVIGATION:
          return { ...acc, navigation: [...acc.navigation, result] };
        case PageType.NOTIFICATION:
          return { ...acc, notification: [...acc.notification, result] };
        case PageType.DICTIONARY:
          return { ...acc, dictionary: [...acc.dictionary, result] };
        case PageType.LEARNING_MODULE:
          return {
            ...acc,
            learningModules: [...acc.learningModules, result],
          };
        case PageType.ASSESSMENT_APPLICATION:
          return {
            ...acc,
            assessmentApplications: [...acc.assessmentApplications, result],
          };
        default:
          return acc;
      }
    },
    {
      assessmentApplications: [],
      learningModules: [],
      notification: [],
      dictionary: [],
      navigation: [],
      doormat: [],
      footer: [],
      seo: [],
    }
  );

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      ...sortedResults,
      userAgent,
      isPreview: appContext.router.isPreview,
    },
  };
};

const StyledBox = styled(Box)`
  @media (max-width: 768px) {
    * {
      font-size: 15px !important;
    }

    .react-cookienotice-wrapper {
      border-radius: 24px !important;
      margin: 16px;
    }
  }
`;

export default PilaApp;
