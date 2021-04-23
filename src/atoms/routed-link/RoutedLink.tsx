import NextLink from "next/link";
import { Link } from "prismic-reactjs";
import React from "react";

import { hrefResolver } from "../../../prismic";
import useLinkResolver from "../../hooks/useLinkResolver";

interface RoutedLink {
  link: Link;
}

const RoutedLink: React.FC<RoutedLink> = ({ link, children }) => {
  const as = useLinkResolver(link);

  return (
    <NextLink href={hrefResolver(link) || "/"} as={as} passHref>
      {children}
    </NextLink>
  );
};

export default RoutedLink;
