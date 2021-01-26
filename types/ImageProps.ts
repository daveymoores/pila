import { RichTextBlock } from "prismic-reactjs";

type ImageProps = Pick<
  RichTextBlock,
  "dimensions" | "alt" | "copyright" | "url"
>;

export default ImageProps;
