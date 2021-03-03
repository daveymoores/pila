// pages/_document.js
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { createResolver } from "next-slicezone/resolver";
import React from "react";
import { ServerStyleSheet } from "styled-components";

export default class extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: unknown) => (props) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      await createResolver();

      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
