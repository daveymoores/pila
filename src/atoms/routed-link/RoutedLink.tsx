import NextLink from "next/link";
import React from "react";

import type { Link } from "../../../lib/prismic-types";
import { resolveLinkSync } from "../../../prismicio";

interface RoutedLinkProps extends React.ComponentPropsWithoutRef<
  typeof NextLink
> {
  link: Link;
  children: React.ReactNode;
}

const RoutedLink: React.FC<RoutedLinkProps> = ({ link, children, ...rest }) => {
  const { href: _href, ...linkProps } = rest;
  void _href;
  const resolvedHref = resolveLinkSync(link);

  return (
    <NextLink href={resolvedHref} {...linkProps}>
      {children}
    </NextLink>
  );
};

export default RoutedLink;
