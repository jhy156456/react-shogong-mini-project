import { GraphQLClient } from "graphql-request";
const URL = process.env.REACT_APP_API_URL;

const setClient = () => {
  const client = new GraphQLClient(URL);
  const token = typeof window !== "undefined" && sessionStorage.getItem("access_token");
  if (token !== null) {
    client.setHeader("Authorization", token);
  }
  return client;
};

export default setClient;
