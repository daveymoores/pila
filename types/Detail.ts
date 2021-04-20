import { Link, RichTextBlock } from "prismic-reactjs";

import { AccordionBlockProps } from "../slices/AccordionBlock";
import { CTABannerAlternateProps } from "../slices/CtaBanner";
import { ImageBlockProps } from "../slices/ImageBlock";
import { RichTextBlokProps } from "../slices/RichTextBlock";
import { NotificationLinkedProps } from "../src/molecules/notification/Notification";
import CustomType from "./CustomType";
import ImageProps from "./ImageProps";
import PageData from "./PageData";

export type DetailPageSlices = RichTextBlokProps &
  ImageBlockProps &
  AccordionBlockProps;

export type DetailPageData = CTABannerAlternateProps &
  NotificationLinkedProps & {
    title?: RichTextBlock[];
    heroImage?: ImageProps;
    category: { categories: Link & { data: { name: string } } };
    associatedContent: { link: Link }[];
    parent: Link;
    uid: string;
  };

export interface LinkedDetailPageProps
  extends Omit<DetailPageData, "associatedContent"> {
  associatedContent: CustomType[];
}

type DetailPageProps = JSX.IntrinsicAttributes &
  PageData<DetailPageSlices, LinkedDetailPageProps>;

export default DetailPageProps;
