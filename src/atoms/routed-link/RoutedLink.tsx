import NextLink from "next/link";
import { Link } from "prismic-reactjs";
import React from "react";

import { hrefResolver, linkResolver } from "../../../prismic";

interface RoutedLink {
  link: Link;
}

const RoutedLink: React.FC<RoutedLink> = ({ link, children }) => {
  const [as, setAs] = React.useState("");

  React.useEffect(() => {
    const getLinkResolverValue = async () => {
      const path = await linkResolver(link);
      setAs(path);
    };
    getLinkResolverValue();
  }, []);

  return (
    <NextLink href={hrefResolver(link) || "/"} as={as} passHref>
      {children}
    </NextLink>
  );
};

export default RoutedLink;
