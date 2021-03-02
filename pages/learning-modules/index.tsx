import { Heading } from "grommet";
import { useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../../prismic";
import PageData from "../../types/PageData";
import PageType from "../../types/PageTypes";

type PageProps = PageData<unknown, unknown> & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = (props: JSX.IntrinsicAttributes) => {
  return <Heading>Learning Module Home Page {JSON.stringify(props)}</Heading>;
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: "single",
  type: PageType.LEARNING_MODULE_HOME,
});

export default Page;
