import Prismic from "prismic-javascript";
import ApiSearchResponse from "prismic-javascript/types/ApiSearchResponse";
import { Link as LinkProps } from "prismic-reactjs";

import smConfig from "./sm.json";
import PageType from "./types/PageTypes";

export const apiEndpoint = smConfig.apiEndpoint;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = "";

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = async (link: LinkProps): Promise<string> => {
  const client = Client();
  let path = "";

  if (link.type === PageType.DETAIL && link.uid) {
    try {
      const data =
        (((await client.query(
          Prismic.Predicates.at("my.detail_page.uid", link.uid)
        )) as unknown) as ApiSearchResponse) || {};
      path = data.results[0].url || "";
    } catch (err) {
      throw new Error(err);
    }
  }

  if (link.type === PageType.ASSESSMENT_APPLICATION && link.uid) {
    try {
      const data =
        (((await client.query(
          Prismic.Predicates.at("my.assessment_application.uid", link.uid)
        )) as unknown) as ApiSearchResponse) || {};
      path = data.results[0].url || "";
    } catch (err) {
      throw new Error(err);
    }
  }

  const resolver: { [key: string]: string } = {
    [PageType.EXIT_PREVIEW]: "/api/exit-preview",
    [PageType.HOME]: "/",
    [PageType.THEME]: `/${link.uid}`,
    [PageType.DETAIL]: path,
    [PageType.GUIDE_HOME]: `/guides`,
    [PageType.GUIDE]: `/guides/${link.uid}`,
    [PageType.ASSESSMENT_APPLICATION]: `/learning-modules${path}`,
    [PageType.LEARNING_MODULE]: `/learning-modules/${link.uid}`,
    [PageType.LEARNING_MODULE_HOME]: "/learning-modules",
    [PageType.FORM]: "/contact",
    [PageType.ERROR]: "/404",
    [PageType.ACCOUNT]: "/account",
    [PageType.SESSIONS]: "/account/sessions",
  };

  return resolver[link.type || PageType.ERROR];
};

// Additional helper function for Next/Link layout
export const hrefResolver = (link: LinkProps): string => {
  const resolver: { [key: string]: string } = {
    [PageType.EXIT_PREVIEW]: "/api/exit-preview",
    [PageType.HOME]: "/",
    [PageType.THEME]: `/[theme]`,
    [PageType.DETAIL]: `/[theme]/[detail]`,
    [PageType.GUIDE_HOME]: `/guides`,
    [PageType.GUIDE]: `/guides/[guide]`,
    [PageType.ASSESSMENT_APPLICATION]:
      "/learning-modules/[learning-module]/[assessment-application]",
    [PageType.LEARNING_MODULE]: "/learning-modules/[learning-module]",
    [PageType.LEARNING_MODULE_HOME]: "/learning-modules",
    [PageType.FORM]: "/contact",
    [PageType.ERROR]: "/404",
    [PageType.ACCOUNT]: "/account",
    [PageType.SESSIONS]: "/account/sessions",
  };

  return resolver[link.type || PageType.ERROR];
};

export const Router = {
  routes: [
    { type: PageType.HOME, path: "/" },
    { type: PageType.THEME, path: "/:uid" },
    { type: PageType.LEARNING_MODULE_HOME, path: "/learning_modules" },
    {
      type: PageType.LEARNING_MODULE,
      path: "/:parent/:uid",
      resolvers: {
        parent: "parent",
      },
    },
    {
      type: PageType.ASSESSMENT_APPLICATION,
      path: "/:parent/:module/:uid",
      resolvers: {
        module: "module",
        parent: "module.parent",
      },
    },
    {
      type: PageType.DETAIL,
      path: "/:parent/:uid",
      resolvers: {
        parent: "parent",
      },
    },
    { type: PageType.GUIDE_HOME, path: `/guides` },
    { type: PageType.GUIDE, path: "/guides/:uid" },
    { type: PageType.FORM, path: "/contact" },
    { type: PageType.SESSIONS, path: "/account/sessions" },
  ],
  href: (type: PageType): string | undefined => {
    const route = Router.routes.find((r) => r.type === type);
    return route && route.path;
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Client = (req = null, options = {}) =>
  Prismic.client(
    apiEndpoint,
    Object.assign({ routes: Router.routes }, options)
  );
