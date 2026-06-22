import type { Link } from "../lib/prismic-types";

interface DownloadLink {
  label?: string;
  downloadLink?: Link;
  link?: Link;
}

export default DownloadLink;
