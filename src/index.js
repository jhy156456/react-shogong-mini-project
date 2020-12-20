import React from "react";
import ReactDOM from "react-dom";


import "assets/scss/material-kit-react.scss?v=1.9.0";


import { ApolloProvider } from "react-apollo";
import Apolloclient from "apollo-boost";
import App from "./App"
const client = new Apolloclient({
  uri: "http://13.124.188.131:8000/graphql",
  request: (operation) => {
    operation.setContext((context) => ({
      headers: {
        ...context.headers,
        Authorization: sessionStorage.getItem("access_token"),
      },
    }));
  },
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById("root")
);
