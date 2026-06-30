import type { PrismicDocument } from "@prismicio/client";

import PageType from "../types/PageTypes";

/** Paths that embed lists or global chrome when these singletons change. */
const SINGLETON_TYPES = new Set<string>([
  PageType.NAVIGATION,
  PageType.FOOTER,
  PageType.SEO,
  PageType.DOORMAT,
  PageType.DICTIONARY,
  PageType.COOKIE_NOTICE,
  PageType.NOTIFICATION,
  PageType.SESSIONS,
]);

export const LISTING_PATHS = [
  "/",
  "/learning-modules",
  "/guides",
  "/contact",
] as const;

/**
 * Resolve Next.js paths to invalidate after a Prismic publish/unpublish.
 * Uses Prismic route resolver `document.url` when available.
 */
export function getPathsToRevalidate(document: PrismicDocument): string[] {
  const paths = new Set<string>();

  if (document.url) {
    paths.add(document.url);
  }

  switch (document.type) {
    case PageType.HOME:
      paths.add("/");
      break;
    case PageType.LEARNING_MODULE:
      paths.add("/learning-modules");
      paths.add("/");
      break;
    case PageType.LEARNING_MODULE_HOME:
      paths.add("/learning-modules");
      paths.add("/");
      break;
    case PageType.THEME:
      paths.add("/");
      break;
    case PageType.ASSESSMENT_APPLICATION:
      paths.add("/learning-modules");
      break;
    case PageType.GUIDE:
      paths.add("/guides");
      break;
    case PageType.GUIDE_HOME:
      paths.add("/guides");
      break;
    case PageType.FORM:
      paths.add("/contact");
      break;
    default:
      break;
  }

  if (SINGLETON_TYPES.has(document.type)) {
    for (const path of LISTING_PATHS) {
      paths.add(path);
    }
  }

  return [...paths].filter((path) => path.startsWith("/"));
}
