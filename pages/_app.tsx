// pages/_app.js
import "../styles/globals.css";

import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import { NextPage } from "next";
import App, { AppContext, AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Prismic from "prismic-javascript";
import React from "react";

import { Client } from "../prismic";
import { LearningModule } from "../slices/PoweredByResearchSection";
import LearningModulesContext from "../src/context/LearningModulesContext";
import { DoormatProps } from "../src/organisms/doormat/Doormat";
import { FooterProps } from "../src/organisms/footer/Footer";
import { NavigationProps } from "../src/organisms/navigation/Navigation";
import Scaffold from "../src/organisms/scaffold/Scaffold";
import PilaTheme from "../src/theme/PilaTheme/PilaTheme";
import CustomType from "../types/CustomType";
import PageType from "../types/PageTypes";

interface DefaultSeoProps {
  url: string;
  title: string;
  description: string;
  site_name: string;
  handle: string;
  appId: string;
}

interface PageProps {
  seo: CustomType<DefaultSeoProps>[] | [];
  learningModules: CustomType<LearningModule>[] | [];
  navigation: CustomType<NavigationProps>[] | [];
  doormat: CustomType<DoormatProps>[] | [];
  footer: CustomType<FooterProps>[] | [];
}

interface Response extends Omit<ApiSearchResponse, "results"> {
  results: CustomType<
    LearningModule &
      NavigationProps &
      DoormatProps &
      FooterProps &
      DefaultSeoProps
  >[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PilaApp: NextPage<AppProps> = (props) => {
  const { Component, pageProps } = props;
  const { url, site_name, handle, appId, title, description } =
    (pageProps.seo || [])[0]?.data || {};

  return (
    <LearningModulesContext.Provider value={pageProps?.learningModules}>
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
    </LearningModulesContext.Provider>
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
          "learning_module",
          "navigation",
          "doormat",
          "footer",
          "seo",
        ]),
        {}
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
        default:
          return acc;
      }
    },
    {
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
