import { RichTextBlock } from "prismic-reactjs";

import { SeoMetaDataProps } from "../src/organisms/seo/Seo";
import CustomType from "./CustomType";

//TODO - fix this interface. Body shouldn't be of type T
type Data<T, K extends unknown> = K &
  SeoMetaDataProps & {
    title: RichTextBlock[];
    slices: T[];
  };

interface PageData<T, K> extends CustomType {
  data: Data<T, K>;
  slices: T[];
}

export default PageData;
