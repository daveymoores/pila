import CustomType from "./CustomType";
import { DetailPageData, DetailPageSlices } from "./Detail";
import PageData from "./PageData";

export interface GuidePageData extends DetailPageData {
  guide_category: PageData<never, { title: string }>;
}

export interface LinkedGuidePageProps
  extends Omit<GuidePageData, "associatedContent"> {
  associatedContent?: CustomType[];
}

type GuidePageProps = JSX.IntrinsicAttributes & {
  params: Record<string, unknown>;
} & PageData<DetailPageSlices, LinkedGuidePageProps>;

export default GuidePageProps;
