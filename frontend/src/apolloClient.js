import ApolloClient from "apollo-boost";
import withApollo from "next-with-apollo";

export const getApolloClient = ({ headers }) =>
  new ApolloClient({
    uri: "http://localhost:4000",
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include",
        },
        headers,
      });
    },
  });

export default withApollo(getApolloClient);
