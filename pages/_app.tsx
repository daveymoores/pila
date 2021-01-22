import { ApolloProvider } from "@apollo/client";
import React from "react";

import useApollo from "../lib/apolloClient";

const App = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <div style={{ margin: "20px" }}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
};

export default App;
