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

export const gaEvent = (): void => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.dataLayer?.push({ event: "event_name" });
  }
};

export const event = (): void => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.dataLayer?.push({ event: "event_name" });
  }
};
