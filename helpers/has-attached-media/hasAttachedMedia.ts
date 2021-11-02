import { Link } from "prismic-reactjs";

const hasAttachedMedia = (link: Link | undefined): boolean => {
  return !!(link?.name && link?.size && link?.url);
};

export default hasAttachedMedia;
