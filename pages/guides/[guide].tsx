import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import { GetStaticPropsResult } from "next";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import Prismic from "prismic-javascript";
import { Link, RichTextBlock } from "prismic-reactjs";
import React from "react";

import { Client } from "../../prismic";
import { CtaBanner } from "../../slices";
import { AccordionBlockProps } from "../../slices/AccordionBlock";
import { CTABannerAlternateProps } from "../../slices/CtaBanner";
import { ImageBlockProps } from "../../slices/ImageBlock";
import { RichTextBlokProps } from "../../slices/RichTextBlock";
import { useNavigationLightTheme } from "../../src/hooks/useNavigationTheme";
import useNotification from "../../src/hooks/useNotification";
import { NotificationLinkedProps } from "../../src/molecules/notification/Notification";
import HeroDetail from "../../src/organisms/hero-detail/HeroDetail";
import Seo from "../../src/organisms/seo/Seo";
import CustomType from "../../types/CustomType";
import ImageProps from "../../types/ImageProps";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";

export type GuidePageSlices = RichTextBlokProps &
  ImageBlockProps &
  AccordionBlockProps;

export type GuidePageProps = CTABannerAlternateProps &
  NotificationLinkedProps & {
    title?: RichTextBlock[];
    heroImage?: ImageProps;
    category: { categories: Link & { data: { name: string } } };
    associatedContent: { link: Link }[];
  };

export interface LinkedGuidePageProps
  extends Omit<GuidePageProps, "associatedContent"> {
  associatedContent: CustomType[];
}

type PageProps = JSX.IntrinsicAttributes &
  PageData<GuidePageSlices, LinkedGuidePageProps>;

const Page: React.FC<PageProps> = ({ data, slices }) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    ctaSectionTitle,
    ctaSectionButtonOneLink,
    ctaSectionButtonOneLabel,
    ctaSectionButtonTwoLink,
    ctaSectionButtonTwoLabel,
    notification,
    ...restProps
  } = data || {};

  useNotification(notification);
  useNavigationLightTheme();

  return (
    <React.Fragment>
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage}
        openGraphTitle={openGraphTitle}
      />
      <HeroDetail {...restProps} slices={slices} />
      {ctaSectionTitle && (
        <CtaBanner
          slice={{
            primary: {
              title: ctaSectionTitle,
              buttonOneLink: ctaSectionButtonOneLink,
              buttonOneLabel: ctaSectionButtonOneLabel,
              buttonTwoLink: ctaSectionButtonTwoLink,
              buttonTwoLabel: ctaSectionButtonTwoLabel,
            },
          }}
        />
      )}
    </React.Fragment>
  );
};

interface StaticContextProps {
  params: {
    guide: string;
  };
}

interface Response extends Omit<ApiSearchResponse, "results"> {
  results: CustomType[];
}

export const getStaticProps = async (
  context: StaticContextProps
): Promise<GetStaticPropsResult<PageProps>> => {
  const { props } = await useGetStaticProps({
    client: Client(),
    type: PageType.GUIDE,
    uid: ({ params }) => params.guide,
    params: {
      fetchLinks: [
        "category.name",
        "notification.body, notification.showGlobal",
      ],
    },
  })(context);

  const associatedContentIds = (
    (props.data.associatedContent as GuidePageProps["associatedContent"]) || []
  ).map(({ link }) => link.id);
  const client = Client();
  let associatedContent;

  if (associatedContentIds) {
    try {
      associatedContent =
        (((await client.query(
          //TODO - why is associatedContent possibly undefined
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Prismic.Predicates.in("document.id", associatedContentIds)
        )) as unknown) as Response) || {};
    } catch (err) {
      throw new Error(err);
    }
  }
  console.log(associatedContent);

  return {
    props: {
      ...props,
      data: { ...props.data, associatedContent: associatedContent?.results },
    },
  };
};

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.GUIDE,
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { guide: uid } }),
});

export default Page;
