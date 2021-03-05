// pages/_app.js
import "../styles/globals.css";

import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import NextApp, { AppInitialProps } from "next/app";
import Prismic from "prismic-javascript";
import React from "react";

import { Client } from "../prismic";
import { LearningModule } from "../slices/PoweredByResearchSection";
import LearningModulesContext from "../src/context/LearningModulesContext";
import { DoormatProps } from "../src/organisms/doormat/Doormat";
import { NavigationProps } from "../src/organisms/navigation/Navigation";
import Scaffold from "../src/organisms/scaffold/Scaffold";
import PilaTheme from "../src/theme/PilaTheme/PilaTheme";
import CustomType from "../types/CustomType";
import PageType from "../types/PageTypes";

interface Props {
  Component: React.FC;
  learningModules: ApiSearchResponse;
}

interface PageProps {
  learningModules: CustomType<LearningModule>[] | [];
  navigation: CustomType<NavigationProps>[] | [];
  doormat: CustomType<DoormatProps>[] | [];
}

interface Response extends Omit<ApiSearchResponse, "results"> {
  results: CustomType<LearningModule & NavigationProps & DoormatProps>[];
}

export default class App extends NextApp<Props, never> {
  static async getInitialProps(): Promise<AppInitialProps> {
    const client = Client();

    const data =
      (((await client.query(
        Prismic.Predicates.any("document.type", [
          "learning_module",
          "doormat",
          "navigation",
        ]),
        {}
      )) as unknown) as Response) || {};

    const sortedResults = data.results.reduce(
      (acc: PageProps, result): PageProps => {
        switch (result.type) {
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
      }
    );

    return {
      pageProps: {
        ...sortedResults,
      },
    };
  }

  render(): React.ReactElement {
    const { Component, pageProps } = this.props;

    return (
      <LearningModulesContext.Provider value={pageProps.learningModules}>
        <PilaTheme>
          <Scaffold
            navigation={(pageProps.navigation || [])[0]?.data}
            doormat={(pageProps.doormat || [])[0]?.data}
          >
            <Component {...pageProps} />
          </Scaffold>
        </PilaTheme>
      </LearningModulesContext.Provider>
    );
  }
}
