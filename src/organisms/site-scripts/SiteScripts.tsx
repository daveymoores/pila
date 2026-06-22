import Script from "next/script";
import React from "react";

const gtmId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const siteEnvironment = process.env.NODE_ENV !== "production" ? "dev" : "live";

const SiteScripts: React.FC = () => (
  <React.Fragment>
    <Script id="data-layer-init" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          siteName: "oecd.org",
          siteEnvironment: "${siteEnvironment}",
          pageLanguage: "en",
        });
      `}
    </Script>
    {gtmId ? (
      <Script id="gtm-loader" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>
    ) : null}
    <Script
      src="https://static.cdn.prismic.io/prismic.js?new=true&repo=pila"
      strategy="lazyOnload"
    />
  </React.Fragment>
);

export default SiteScripts;
