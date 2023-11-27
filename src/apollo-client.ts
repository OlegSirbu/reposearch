import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
