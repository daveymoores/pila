import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { PrismicLink } from "apollo-link-prismic";
import { useMemo } from "react";

interface InitialState {
  [key: string]: never;
}

export let apolloClient: ApolloClient<NormalizedCacheObject>;

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: PrismicLink({
    uri: "https://pila.prismic.io/graphql",
  }),
  cache: new InMemoryCache(),
});

const initializeApollo = (initialState: InitialState | null = null) => {
  const _apolloClient = apolloClient ?? client;

  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined1 with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

const useApollo = (initialState: InitialState) => {
  return useMemo(() => initializeApollo(initialState), [initialState]);
};

export default useApollo;
