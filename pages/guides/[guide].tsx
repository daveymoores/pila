import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import { GetStaticPropsResult } from "next";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import React from "react";

import { Client } from "../../prismic";
import { CtaBanner } from "../../slices";
import { useNavigationLightTheme } from "../../src/hooks/useNavigationTheme";
import useNotification from "../../src/hooks/useNotification";
import HeroDetail from "../../src/organisms/hero-detail/HeroDetail";
import Seo from "../../src/organisms/seo/Seo";
import CustomType from "../../types/CustomType";
import DetailPageProps, { DetailPageData } from "../../types/Detail";
import PageType from "../../types/PageTypes";

const Page: React.FC<DetailPageProps> = ({ data, slices, uid }) => {
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
      <HeroDetail {...restProps} uid={uid} slices={slices} />
      {ctaSectionTitle && RichText.asText(ctaSectionTitle) && (
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
): Promise<GetStaticPropsResult<DetailPageProps>> => {
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
    (props.data.associatedContent as DetailPageData["associatedContent"]) || []
  ).map(({ link }) => link.id);
  const client = Client();
  let associatedContent;

  if (!associatedContentIds.some((content) => !content)) {
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

  return {
    props: {
      ...props,
      data: {
        ...props.data,
        associatedContent: associatedContent?.results || [],
      },
      uid: context.params.guide,
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
