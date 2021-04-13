import { Heading, Paragraph } from "grommet";
import { useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../prismic";
import { useNavigationLightTheme } from "../src/hooks/useNavigationTheme";
import useNotification from "../src/hooks/useNotification";
import Section from "../src/layout/section/Section";
import { NotificationLinkedProps } from "../src/molecules/notification/Notification";
import ResponsiveGrid from "../src/organisms/responsive-grid/ResponsiveGrid";
import Seo from "../src/organisms/seo/Seo";
import PageData from "../types/PageData";
import PageType from "../types/PageTypes";
import QueryType from "../types/QueryType";

type ContactPageProps = NotificationLinkedProps;

type PageProps = PageData<unknown, ContactPageProps> & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = (props) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    notification,
  } = props.data;

  useNotification(notification);
  useNavigationLightTheme();

  return (
    <Section>
      <ResponsiveGrid rows={"1"} columns={"large"}>
        <Seo
          metaDescription={metaDescription}
          metaTitle={metaTitle}
          openGraphDescription={openGraphDescription}
          openGraphImage={openGraphImage}
          openGraphTitle={openGraphTitle}
        />
        <Heading>Form Page</Heading>
        <Paragraph>{JSON.stringify(props)}</Paragraph>
      </ResponsiveGrid>
    </Section>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: QueryType.SINGLE,
  type: PageType.FORM,
  params: { fetchLinks: ["notification.body, notification.showGlobal"] },
});

export default Page;
