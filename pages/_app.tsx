// pages/_app.js
import "../styles/globals.css";

import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import NextApp from "next/app";
import Prismic from "prismic-javascript";
import React from "react";

import { Client } from "../prismic";
import Scaffold from "../src/organisms/scaffold/Scaffold";
import PilaTheme from "../src/theme/PilaTheme/PilaTheme";

interface Props {
  Component: React.ReactComponentElement<any>;
  learningModules: ApiSearchResponse;
}

export default class App extends NextApp<Props, never> {
  static async getInitialProps(): Promise<unknown> {
    const client = Client();
    const modules =
      (await client.query(
        Prismic.Predicates.at("document.type", "learning_module"),
        {}
      )) || {};
    return {
      learningModules: modules,
    };
  }

  render(): React.ReactElement {
    const { Component, pageProps } = this.props;

    return (
      <PilaTheme>
        <Scaffold>
          <Component {...pageProps} />
        </Scaffold>
      </PilaTheme>
    );
  }
}
