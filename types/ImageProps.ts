import type { FilledImageFieldImage } from "@prismicio/client";

type ImageProps = Pick<
  FilledImageFieldImage,
  "dimensions" | "alt" | "copyright" | "url"
>;

export default ImageProps;
