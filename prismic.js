import Link from "next/link";
import Prismic from "prismic-javascript";
import React from "react";

import smConfig from "./sm.json";

export const apiEndpoint = smConfig.apiEndpoint;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = "";

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === "theme_page") {
    return `/${doc.uid}`;
  }

  if (doc.type === "guide") {
    return `/guides/${doc.uid}`;
  }

  return "/";
};

// Additional helper function for Next/Link layout
export const hrefResolver = (doc) => {
  if (doc.type === "theme_page") {
    return `/[uid]`;
  }

  if (doc.type === "guide") {
    return `/guides/[uid]`;
  }

  return "/";
};

export const customLink = (type, element, content, children, index) => (
  <Link
    key={index}
    href={hrefResolver(element.data)}
    as={linkResolver(element.data)}
  >
    <a>{content}</a>
  </Link>
);

export const Router = {
  routes: [
    { type: "theme_page", path: "/:uid" },
    { type: "guide", path: "/guides/:uid" },
  ],

  href: (type) => {
    const route = Router.routes.find((r) => r.type === type);
    return route && route.href;
  },
};

export const Client = (req = null, options = {}) =>
  Prismic.client(
    apiEndpoint,
    Object.assign({ routes: Router.routes }, options)
  );
