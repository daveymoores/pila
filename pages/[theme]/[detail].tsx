import { GetStaticPropsResult } from "next";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import { Link, RichText } from "prismic-reactjs";
import React from "react";

import fetchAssociatedContent from "../../helpers/fetch-associated-content/fetchAssociatedContent";
import { Client } from "../../prismic";
import { CtaBanner } from "../../slices";
import { useNavigationLightTheme } from "../../src/hooks/useNavigationTheme";
import useNotification from "../../src/hooks/useNotification";
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
    notification,
    parent,
    ...restProps
  } = data || {};

  useNotification(notification);
  useNavigationLightTheme();

  const breadcrumbLinks: BreadcrumbItem[] = [
    {
      link: {
        type: PageType.THEME,
        uid: params?.theme as Link["uid"],
      },
      label: parent?.data.title
        ? RichText.asText(parent?.data.title)
        : "[THEME_PAGE_TITLE]",
    },
    {
      link: { type: PageType.DETAIL, uid: params?.detail as Link["uid"] },
      label: restProps.title
        ? RichText.asText(restProps.title)
        : "[DETAIL_PAGE_TITLE]",
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
    theme: string;
    detail: string;
  };
}

export const getStaticProps = async (
  context: StaticContextProps
): Promise<GetStaticPropsResult<DetailPageProps>> => {
  const { props } = await useGetStaticProps({
    client: Client(),
    type: PageType.DETAIL,
    uid: ({ params }) => params.detail,
    params: {
      fetchLinks: [
        "category.name",
        "theme_page.title",
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

interface Params {
  params: {
    detail: string;
    theme?: string;
  };
}

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.DETAIL,
  fallback: false,
  formatPath: ({ uid, data }: DetailPageProps): Params => {
    if (data.parent.uid) {
      return { params: { theme: data.parent.uid, detail: uid } };
    }
    // TODO - display 404 here
    return { params: { detail: uid } };
  },
});

export default Page;
