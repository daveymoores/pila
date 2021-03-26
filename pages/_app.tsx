// pages/_app.js
import "../styles/globals.css";

import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import { NextPage } from "next";
import App, { AppContext, AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Prismic from "prismic-javascript";
import React from "react";

import getApplicationAverages from "../helpers/get-application-averages/getApplicationAverages";
import { Client } from "../prismic";
import AssessmentApplicationContext from "../src/context/AssessmentApplicationContext";
import LearningModulesContext from "../src/context/LearningModulesContext";
import NavigationThemeContext from "../src/context/NavigationThemeContext";
import { DoormatProps } from "../src/organisms/doormat/Doormat";
import { FooterProps } from "../src/organisms/footer/Footer";
import {
  NavigationProps,
  NavigationTheme,
} from "../src/organisms/navigation/Navigation";
import Scaffold from "../src/organisms/scaffold/Scaffold";
import PilaTheme from "../src/theme/PilaTheme/PilaTheme";
import CustomType from "../types/CustomType";
import PageType from "../types/PageTypes";
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
  navigation: CustomType<NavigationProps>[] | [];
  doormat: CustomType<DoormatProps>[] | [];
  footer: CustomType<FooterProps>[] | [];
  seo: CustomType<DefaultSeoProps>[] | [];
}

interface Response extends Omit<ApiSearchResponse, "results"> {
  results: CustomType<
    LearningModuleProps &
      NavigationProps &
      DoormatProps &
      FooterProps &
      DefaultSeoProps &
      AssessmentApplicationProps
  >[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PilaApp: NextPage<AppProps<PageProps>> = (props) => {
  const { Component, pageProps } = props;
  const [navigationTheme, setNavigationTheme] = React.useState<NavigationTheme>(
    NavigationTheme.LIGHT
  );

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
    const applications = (learningModule.data?.applications || []).reduce(
      (acc: LearningModuleProps["applications"], { assessmentApplication }) => {
        const appAverages = assessmentApplicationAverages.find(
          (app) => app.uid === assessmentApplication.uid
        );

        const applicationData = (pageProps?.assessmentApplications || []).find(
          (application: CustomType<AssessmentApplicationProps>) =>
            application.uid === assessmentApplication.uid
        );

        if (!applicationData) return acc;

        return [
          ...acc,
          {
            assessmentApplication: {
              ...assessmentApplication,
              ...applicationData.data,
              applicationsStats: appAverages,
            },
          },
        ];
      },
      []
    );

    return {
      ...learningModule,
      data: { ...learningModule.data, applications },
    };
  });

  return (
    <NavigationThemeContext.Provider
      value={{
        theme: navigationTheme,
        setTheme: (theme: NavigationTheme) => setNavigationTheme(theme),
      }}
    >
      <LearningModulesContext.Provider value={learningModules}>
        <AssessmentApplicationContext.Provider
          value={pageProps?.assessmentApplication}
        >
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
          <PilaTheme>
            <Scaffold
              navigation={(pageProps?.navigation || [])[0]?.data}
              doormat={(pageProps?.doormat || [])[0]?.data}
              footer={(pageProps?.footer || [])[0]?.data}
            >
              <Component {...pageProps} />
            </Scaffold>
          </PilaTheme>
        </AssessmentApplicationContext.Provider>
      </LearningModulesContext.Provider>
    </NavigationThemeContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
PilaApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const client = Client();
  let data;

  try {
    data =
      (((await client.query(
        Prismic.Predicates.any("document.type", [
          "assessment_application",
          "learning_module",
          "navigation",
          "doormat",
          "footer",
          "seo",
        ])
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
    },
  };
};

export default PilaApp;
