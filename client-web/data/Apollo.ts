import ApolloClient from "apollo-boost";

export {default as gql} from "graphql-tag";

export const Apollo = new ApolloClient({
  uri: "/graphql",
});
