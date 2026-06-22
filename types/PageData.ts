import type { RichTextBlock } from "../lib/prismic-types";
import { SeoMetaDataProps } from "../src/organisms/seo/Seo";
import CustomType from "./CustomType";

type Data<T, K> = K &
  SeoMetaDataProps & {
    title: RichTextBlock;
    slices: T[];
  };

interface PageData<T, K> extends CustomType {
  data: Data<T, K>;
  slices: T[];
}

export default PageData;
