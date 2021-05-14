import { GetStaticPropsResult } from "next";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import { Link, RichText } from "prismic-reactjs";
import React from "react";

import fetchAssociatedContent from "../../helpers/fetch-associated-content/fetchAssociatedContent";
import { Client } from "../../prismic";
import { CtaBanner } from "../../slices";
import { BreadcrumbItem } from "../../src/molecules/breadcrumb/breadcrumb";
import HeroDetail from "../../src/organisms/hero-detail/HeroDetail";
import Seo from "../../src/organisms/seo/Seo";
import DetailPageProps from "../../types/Detail";
import PageType from "../../types/PageTypes";

const Page: React.FC<DetailPageProps> = ({ data, slices, params }) => {
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
    ...restProps
  } = data || {};

  const breadcrumbLinks: BreadcrumbItem[] = [
    {
      link: {
        type: PageType.GUIDE_HOME,
        uid: "guide_home",
      },
      label: "Guides",
    },
    {
      link: { type: PageType.GUIDE, uid: params?.guide as Link["uid"] },
      label: restProps.title
        ? RichText.asText(restProps.title)
        : "[GUIDE_PAGE_TITLE]",
    },
  ];

  return (
    <React.Fragment>
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage}
        openGraphTitle={openGraphTitle}
      />
      <HeroDetail
        {...restProps}
        breadcrumbLinks={breadcrumbLinks}
        slices={slices}
      />
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

  const associatedContent = await fetchAssociatedContent(
    props.data.associatedContent
  );

  return {
    props: {
      ...props,
      data: {
        ...props.data,
        associatedContent: associatedContent?.results || [],
      },
      params: context.params,
    },
  };
};

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.GUIDE,
  fallback: false,
  formatPath: ({ uid }) => ({ params: { guide: uid } }),
});

export default Page;
