import { Link, RichTextBlock } from "prismic-reactjs";

import { AccordionBlockProps } from "../slices/AccordionBlock";
import { CTABannerAlternateProps, CtaBannerProps } from "../slices/CtaBanner";
import { HighlightBannerProps } from "../slices/HighlightBanner";
import { ImageBlockProps } from "../slices/ImageBlock";
import { RichTextBlokProps } from "../slices/RichTextBlock";
import CustomType from "./CustomType";
import ImageProps from "./ImageProps";
import PageData from "./PageData";

export type DetailPageSlices = RichTextBlokProps &
  ImageBlockProps &
  AccordionBlockProps;

type BannerSlices = CtaBannerProps & HighlightBannerProps;

export type DetailPageData = CTABannerAlternateProps & {
  title?: RichTextBlock[];
  heroImage?: ImageProps;
  category?: { categories: Link & { data: { name: string } } };
  associatedContent?: { link: Link }[];
  parent?: Link & { data: { title: RichTextBlock[] } };
  bannerSlices: BannerSlices[];
};

export interface LinkedDetailPageProps
  extends Omit<DetailPageData, "associatedContent"> {
  associatedContent?: CustomType[];
}

type DetailPageProps = JSX.IntrinsicAttributes & {
  params: Record<string, unknown>;
} & PageData<DetailPageSlices, LinkedDetailPageProps>;

export default DetailPageProps;
