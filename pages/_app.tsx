// pages/_app.js
import "../styles/globals.css";

import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import isEmpty from "lodash/isEmpty";
import { NextPage } from "next";
import App, { AppContext, AppProps } from "next/app";
import { AppContextType } from "next/dist/next-server/lib/utils";
import { Router } from "next/router";
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

interface PageProps {
  learningModules: CustomType<LearningModule>[] | [];
  navigation: CustomType<NavigationProps>[] | [];
  doormat: CustomType<DoormatProps>[] | [];
  footer: CustomType<FooterProps>[] | [];
}

interface Response extends Omit<ApiSearchResponse, "results"> {
  results: CustomType<
    LearningModule & NavigationProps & DoormatProps & FooterProps
  >[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PilaApp: NextPage<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <LearningModulesContext.Provider value={pageProps?.learningModules}>
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
        ]),
        {}
      )) as unknown) as Response) || {};
  } catch (err) {
    throw new Error(err);
  }

  const sortedResults = data.results.reduce(
    (acc: PageProps, result): PageProps => {
      switch (result.type) {
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
