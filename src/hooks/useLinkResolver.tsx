import { Link as LinkProps } from "prismic-reactjs";
import React from "react";

import { linkResolver } from "../../prismic";

const useLinkResolver = (link: LinkProps): string => {
  const [as, setAs] = React.useState("");

  React.useEffect(() => {
    const getLinkResolverValue = async () => {
      const path = await linkResolver(link);
      setAs(path);
    };
    getLinkResolverValue();
  }, []);

  return as;
};

export default useLinkResolver;
