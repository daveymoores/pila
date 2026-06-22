import CustomType from "./CustomType";
import { DetailPageData, DetailPageSlices } from "./Detail";
import PageData from "./PageData";

export interface GuidePageData extends DetailPageData {
  guide_category: PageData<never, { title: string }>;
}

export interface LinkedGuidePageProps extends Omit<
  GuidePageData,
  "associatedContent"
> {
  associatedContent?: CustomType[];
}

type GuidePageProps = PageData<DetailPageSlices, LinkedGuidePageProps> & {
  params?: Record<string, unknown>;
};

export default GuidePageProps;
