import { isFilled, type LinkField } from "@prismicio/client";

import type { Link } from "../../lib/prismic-types";

const linkIsValid = (link?: Link) => {
  const field = link as LinkField;
  if (!link || !isFilled.link(field)) return false;
  if (field.link_type === "Document") return true;
  return "url" in field && !!field.url && field.url !== "";
};

export default linkIsValid;
