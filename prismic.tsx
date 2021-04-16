import { Anchor, AnchorProps } from "grommet";
import Link from "next/link";
import Prismic from "prismic-javascript";
import { Link as LinkProps } from "prismic-reactjs";
import React, { ForwardedRef } from "react";

import resolveModuleFromUID from "./helpers/resolve-module-from-uid/resolveModuleFromUID";
import { LearningModuleProps } from "./pages/learning-modules/[learning_module]";
import smConfig from "./sm.json";
import LearningModulesContext from "./src/context/LearningModulesContext";
import CustomType from "./types/CustomType";
import PageType from "./types/PageTypes";

export const apiEndpoint = smConfig.apiEndpoint;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = "";

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (
  link: LinkProps,
  modules: CustomType<LearningModuleProps>[]
): string => {
  const resolver: { [key: string]: string } = {
    [PageType.EXIT_PREVIEW]: "/api/exit-preview",
    [PageType.HOME]: "/",
    [PageType.THEME]: `/${link.uid}`,
    [PageType.DETAIL]: `/${link.uid}`,
    [PageType.GUIDE]: `/guides/${link.uid}`,
    [PageType.ASSESSMENT_APPLICATION]: `/learning-modules/${resolveModuleFromUID(
      link.uid,
      modules
    )}/${link.uid}`,
    [PageType.LEARNING_MODULE]: `/learning-modules/${link.uid}`,
    [PageType.LEARNING_MODULE_HOME]: "/learning-modules",
    [PageType.FORM]: "/contact",
    [PageType.ERROR]: "/error",
    [PageType.ACCOUNT]: "/account",
    [PageType.SESSION]: "/account/sessions",
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
    [PageType.GUIDE]: `/guides/[guide]`,
    [PageType.ASSESSMENT_APPLICATION]:
      "/learning-modules/[learning-module]/[assessment-application]",
    [PageType.LEARNING_MODULE]: "/learning-modules/[learning-module]",
    [PageType.LEARNING_MODULE_HOME]: "/learning-modules",
    [PageType.FORM]: "/contact",
    [PageType.ERROR]: "/error",
    [PageType.ACCOUNT]: "/account",
    [PageType.SESSION]: "/account/sessions",
  };

  return resolver[link.type || PageType.ERROR];
};

interface CustomLinkProps extends AnchorProps {
  label: string;
  link: LinkProps;
  onClick?: () => void;
}

interface GrommetLinkProps extends AnchorProps {
  onClick?: () => void;
  children: string;
}

export const RoutedTextLink: React.FC<CustomLinkProps> = ({
  label,
  link,
  onClick,
  ...rest
}) => {
  const learningModules = React.useContext(LearningModulesContext);

  return (
    <Link
      href={hrefResolver(link)}
      as={linkResolver(link, learningModules)}
      passHref
    >
      <GrommetLink onClick={onClick} {...rest}>
        {label}
      </GrommetLink>
    </Link>
  );
};

// eslint-disable-next-line react/display-name
const GrommetLink = React.forwardRef(
  (
    { onClick, href, children, ...rest }: GrommetLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <Anchor
        label={children}
        href={href}
        onClick={onClick}
        {...rest}
        ref={ref}
      />
    );
  }
);

// TODO - fix Router
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
      path: "/:parent?/:uid",
      resolvers: {
        parent: "parent",
      },
    },
    { type: PageType.GUIDE, path: "/guides/:uid" },
    { type: PageType.FORM, path: "/contact" },
  ],
  href: (type: PageType): string | undefined => {
    const route = Router.routes.find((r) => r.type === type);
    return route && route.path; // TODO - why was this href?
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Client = (req = null, options = {}) =>
  Prismic.client(
    apiEndpoint,
    Object.assign({ routes: Router.routes }, options)
  );
