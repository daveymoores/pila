// pages/_app.js
import "../styles/globals.css";

import NextApp from "next/app";
import React from "react";

import Scaffold from "../src/organisms/Scaffold/Scaffold";
import PilaTheme from "../src/theme/PilaTheme/PilaTheme";

export default class App extends NextApp {
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
