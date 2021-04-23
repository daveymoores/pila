import NextLink from "next/link";
import { Link } from "prismic-reactjs";
import React from "react";

import { hrefResolver, linkResolver } from "../../../prismic";
import LearningModulesContext from "../../context/LearningModulesContext";

interface RoutedLink {
  link: Link;
}

const RoutedLink: React.FC<RoutedLink> = ({ link, children }) => {
  const [as, setAs] = React.useState("");
  const learningModules = React.useContext(LearningModulesContext);

  React.useEffect(() => {
    const getLinkResolverValue = async () => {
      const path = await linkResolver(link, learningModules);
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
