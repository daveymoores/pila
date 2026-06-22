import Document, {
  type DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

const gtmId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export default class extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

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
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap"
            as="style"
          />
          <link
            rel="preload"
            href="/fonts/font.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/font.woff"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          {gtmId ? (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          ) : null}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
