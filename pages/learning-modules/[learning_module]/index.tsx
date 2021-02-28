import { Heading } from "grommet";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../../../prismic";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";

type PageProps = PageData<unknown, unknown> & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = (props) => {
  console.log(props);
  return <Heading>Learning Module Page: {props.uid}</Heading>;
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.LEARNING_MODULE,
  uid: ({ params }) => params.learning_module,
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.LEARNING_MODULE,
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { learning_module: uid } }),
});

export default Page;
