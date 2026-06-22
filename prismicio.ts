import * as prismic from "@prismicio/client";
import {
  type CreateClientConfig,
  enableAutoPreviews,
} from "@prismicio/next/pages";

import { getLinkUid, getLinkUrl, type Link } from "./lib/prismic-types";
import PageType from "./types/PageTypes";

export const repositoryName = "pila";

const routes: prismic.Route[] = [
  { type: PageType.HOME, path: "/" },
  { type: PageType.THEME, path: "/:uid" },
  { type: PageType.LEARNING_MODULE_HOME, path: "/learning-modules" },
  {
    type: PageType.LEARNING_MODULE,
    path: "/learning-modules/:uid",
  },
  {
    type: PageType.ASSESSMENT_APPLICATION,
    path: "/learning-modules/:module/:uid",
    resolvers: {
      module: "module",
    },
  },
  {
    type: PageType.DETAIL,
    path: "/:parent/:uid",
    resolvers: {
      parent: "parent",
    },
  },
  { type: PageType.GUIDE_HOME, path: "/guides" },
  { type: PageType.GUIDE, path: "/guides/:uid" },
  { type: PageType.FORM, path: "/contact" },
];

export type PrismicLink =
  | prismic.LinkField
  | prismic.FilledContentRelationshipField
  | Link;

export const hrefResolver = (link: PrismicLink): string => {
  const type = "type" in link && link.type ? link.type : PageType.ERROR;
  const resolver: Record<string, string> = {
    [PageType.EXIT_PREVIEW]: "/api/exit-preview",
    [PageType.HOME]: "/",
    [PageType.THEME]: "/[theme]",
    [PageType.DETAIL]: "/[theme]/[detail]",
    [PageType.GUIDE_HOME]: "/guides",
    [PageType.GUIDE]: "/guides/[guide]",
    [PageType.ASSESSMENT_APPLICATION]:
      "/learning-modules/[learning_module]/[assessment_application]",
    [PageType.LEARNING_MODULE]: "/learning-modules/[learning_module]",
    [PageType.LEARNING_MODULE_HOME]: "/learning-modules",
    [PageType.FORM]: "/contact",
    [PageType.ERROR]: "/404",
    [PageType.ACCOUNT]: "/account",
    [PageType.SESSIONS]: "/account/sessions",
  };

  return resolver[type] || "/404";
};

export function resolveLinkSync(link: Link): string {
  if (!link || typeof link !== "object") {
    return "/404";
  }

  const linkType = "link_type" in link ? link.link_type : undefined;

  if (linkType === "Web" || linkType === "Media") {
    return getLinkUrl(link) ?? "/";
  }

  const url = getLinkUrl(link);
  if (url) {
    return url;
  }

  const type = "type" in link && link.type ? link.type : PageType.ERROR;
  const uid = getLinkUid(link);

  const resolver: Record<string, string> = {
    [PageType.EXIT_PREVIEW]: "/api/exit-preview",
    [PageType.HOME]: "/",
    [PageType.THEME]: uid ? `/${uid}` : "/404",
    [PageType.DETAIL]: "/404",
    [PageType.GUIDE_HOME]: "/guides",
    [PageType.GUIDE]: uid ? `/guides/${uid}` : "/404",
    [PageType.ASSESSMENT_APPLICATION]: "/404",
    [PageType.LEARNING_MODULE]: uid ? `/learning-modules/${uid}` : "/404",
    [PageType.LEARNING_MODULE_HOME]: "/learning-modules",
    [PageType.FORM]: "/contact",
    [PageType.ERROR]: "/404",
    [PageType.ACCOUNT]: "/account",
    [PageType.SESSIONS]: "/account/sessions",
  };

  return resolver[type] || "/404";
}

export const linkResolver = async (link: PrismicLink): Promise<string> => {
  const client = createClient();
  let path = "";

  if (
    "type" in link &&
    link.type === PageType.DETAIL &&
    "uid" in link &&
    link.uid
  ) {
    const page = await client.getByUID(PageType.DETAIL, link.uid);
    path = page.url || "";
  }

  if (
    "type" in link &&
    link.type === PageType.ASSESSMENT_APPLICATION &&
    "uid" in link &&
    link.uid
  ) {
    const page = await client.getByUID(
      PageType.ASSESSMENT_APPLICATION,
      link.uid,
    );
    path = page.url || "";
  }

  const type = "type" in link && link.type ? link.type : PageType.ERROR;
  const uid = "uid" in link ? link.uid : undefined;

  const resolver: Record<string, string> = {
    [PageType.EXIT_PREVIEW]: "/api/exit-preview",
    [PageType.HOME]: "/",
    [PageType.THEME]: `/${uid}`,
    [PageType.DETAIL]: path,
    [PageType.GUIDE_HOME]: "/guides",
    [PageType.GUIDE]: `/guides/${uid}`,
    [PageType.ASSESSMENT_APPLICATION]: path,
    [PageType.LEARNING_MODULE]: `/learning-modules/${uid}`,
    [PageType.LEARNING_MODULE_HOME]: "/learning-modules",
    [PageType.FORM]: "/contact",
    [PageType.ERROR]: "/404",
    [PageType.ACCOUNT]: "/account",
    [PageType.SESSIONS]: "/account/sessions",
  };

  return resolver[type] || "/404";
};

export function createClient({
  previewData,
  req,
  ...config
}: CreateClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  enableAutoPreviews({ client, previewData, req });

  return client;
}

/** @deprecated Use createClient from prismicio.ts */
export const Client = () => createClient();

export const apiEndpoint = prismic.getRepositoryEndpoint(repositoryName);
