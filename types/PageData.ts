import { SeoMetaDataProps } from "../src/organisms/seo/Seo";
import CustomType from "./CustomType";

type Data<T, K extends unknown> = K &
  SeoMetaDataProps & {
    body: T[];
  };

interface PageData<T, K> extends CustomType {
  data: Data<T, K>;
  slices: T[];
}

export default PageData;
