import SliceZone from "next-slicezone";
import { useGetStaticPaths, useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../../prismic";
import resolver from "../../sm-resolver.js";

const Page = (props: JSX.IntrinsicAttributes) =>
  console.log("props -> ", props) || (
    <SliceZone {...props} resolver={resolver} />
  );

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  uid: ({ params }: { params: { uid: string } }) => params.uid,
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: "detail_page",
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }: { uid: string }) => ({ params: { uid } }),
});

export default Page;