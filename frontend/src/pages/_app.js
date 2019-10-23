import React from "react";
import App from "next/app";
// import { ApolloProvider } from "react-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "../apolloClient";

class MyApp extends App {
  render() {
    const { Component, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component />
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
