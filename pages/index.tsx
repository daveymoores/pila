import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";
import React from "react";

import { Client } from "../prismic";
import resolver from "../sm-resolver.js";

const Page = (props: JSX.IntrinsicAttributes) => {
  console.log(props);
  return <SliceZone {...props} resolver={resolver} />;
};

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: "single",
  type: "home",
});

export default Page;
