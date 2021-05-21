import { Link, RichTextBlock } from "prismic-reactjs";

import { AccordionBlockProps } from "../slices/AccordionBlock";
import { CtaBannerProps } from "../slices/CtaBanner";
import { HighlightBannerProps } from "../slices/HighlightBanner";
import { ImageBlockProps } from "../slices/ImageBlock";
import { RichTextBlokProps } from "../slices/RichTextBlock";
import CustomType from "./CustomType";
import ImageProps from "./ImageProps";
import PageData from "./PageData";

export type DetailPageSlices = RichTextBlokProps &
  ImageBlockProps &
  AccordionBlockProps;

export type DetailBannerSlices = CtaBannerProps & HighlightBannerProps;

export interface DetailPageData {
  title?: RichTextBlock[];
  heroImage?: ImageProps;
  category?: { categories: Link & { data: { name: string } } };
  associatedContentLabel: string;
  associatedContent?: { link: Link }[];
  parent?: Link & { data: { title: RichTextBlock[] } };
  bannerSlices: DetailBannerSlices[];
}

export interface LinkedDetailPageProps
  extends Omit<DetailPageData, "associatedContent"> {
  associatedContent?: CustomType[];
}

type DetailPageProps = JSX.IntrinsicAttributes & {
  params: Record<string, unknown>;
} & PageData<DetailPageSlices, LinkedDetailPageProps>;

export default DetailPageProps;
