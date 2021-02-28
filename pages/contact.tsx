import { Heading } from "grommet";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../prismic";
import PageData from "../types/PageData";
import PageType from "../types/PageTypes";

type PageProps = PageData<unknown, unknown> & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = (props: JSX.IntrinsicAttributes) => {
  console.log(props);
  return <Heading>Form Page</Heading>;
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.FORM,
  uid: ({ params }) => params.form,
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.FORM,
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { form: uid } }),
});

export default Page;
