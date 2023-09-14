import { Link } from "prismic-reactjs";

const linkIsValid = (link?: Link) => {
  return link && link.url && link.url !== "" && !link.isBroken;
};

export default linkIsValid;
