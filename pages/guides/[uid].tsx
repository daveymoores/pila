import SliceZone from "next-slicezone";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../../prismic";
import resolver from "../../sm-resolver.js";
import PageType from "../../types/PageTypes";

const Page = (props: JSX.IntrinsicAttributes) => {
  console.log(props);
  return <SliceZone {...props} resolver={resolver} />;
};

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: PageType.GUIDE,
  uid: ({ params }: { params: { uid: string } }) => params.uid,
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: PageType.GUIDE,
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }: { uid: string }) => ({ params: { uid } }),
});

export default Page;
