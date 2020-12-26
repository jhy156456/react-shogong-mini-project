import React from "react";
import ReactDOM from "react-dom";
import "assets/scss/material-kit-react.scss?v=1.9.0";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
//import { Provider } from "react-redux";
import App from "./App";

const httpLink = createHttpLink({
  uri: "http://13.124.188.131:8000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: sessionStorage.getItem("access_token"),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,
  document.getElementById("root")
);
