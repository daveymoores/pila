interface pageViewProps {
  contentType?: string;
  pageType?: string;
  pageCategory?: "homepage" | "publication";
  topic?: string;
}

export const siteView = (props?: pageViewProps): void => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.dataLayer?.push({
      ...props,
    });
  }
};

export const pageView = (
  url: string,
  title: string,
  description: string
): void => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.dataLayer?.push({
      event: "Pageview",
      pagePath: url,
      pageTitle: title,
      pageDescription: description,
    });
  }
};

export enum GAEventType {
  DOWNLOAD = "download",
  LOGIN = "login",
  CONTACT_FORM = "contactForm",
  ACCOUNT_CREATION = "accountCreation",
  ALERT_SUBSCRIPTION = "alertSubscription",
  OUT_BOUND_CLICK = "outBoundClick",
  CROSS_SITE_LINKS = "crossSiteLinks",
}

export const gaEvent = (
  event_name: GAEventType,
  document?: string,
  url?: string
): void => {
  if (typeof window !== "undefined") {
    if (document) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.dataLayer?.push({ event: event_name, document });
    } else if (url) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.dataLayer?.push({ event: event_name, url });
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.dataLayer?.push({ event: event_name });
    }
  }
};
