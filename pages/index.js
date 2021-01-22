import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import PrismicDOM from "prismic-dom";
import React from "react";

import { client } from "../lib/apolloClient";
import styles from "../styles/Home.module.css";

const homeQuery = gql`
  query {
    allHomes {
      edges {
        node {
          title
        }
      }
    }
  }
`;

export default function Home(props) {
  // might need this for preview
  // const { loading, error, data } = useQuery(homeQuery);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{PrismicDOM.RichText.asText(props.title)}</h1>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({ query: homeQuery });
  const { node } = data.allHomes.edges[0];
  return {
    props: node, // will be passed to the page component as props
  };
}
