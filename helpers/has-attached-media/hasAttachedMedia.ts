import { isFilled, type LinkField } from "@prismicio/client";

import type { Link } from "../../lib/prismic-types";

const hasAttachedMedia = (link: Link | undefined): boolean => {
  const field = link as LinkField;
  return !!(
    link &&
    isFilled.link(field) &&
    field.link_type === "Media" &&
    field.name &&
    field.size &&
    field.url
  );
};

export default hasAttachedMedia;
