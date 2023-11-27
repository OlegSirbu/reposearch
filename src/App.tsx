import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import HomePage from "@/pages/HomePage";
import client from "@/apollo-client";

const App: FC = () => (
  <ApolloProvider client={client}>
    <div className="max-w-xl m-auto">
      <h1 className="text-2xl pb-4">GitHub Repositories</h1>
      <HomePage />
    </div>
  </ApolloProvider>
);

export default App;
