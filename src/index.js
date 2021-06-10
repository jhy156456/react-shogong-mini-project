import React from "react";
import ReactDOM from "react-dom";
import "assets/scss/material-kit-react.scss?v=1.9.0";
import {ApolloProvider, ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import dotenv from 'dotenv'
import App from "./App";
import {Helmet} from 'react-helmet'
dotenv.config();
const httpLink = createHttpLink({uri: process.env.REACT_APP_API_URL});
const authLink = setContext((_, {headers}) => {
    const token = sessionStorage.getItem("access_token");
    return {
        headers: {
            ...headers,
            Authorization: token
        }
    };
});

const client = new ApolloClient(
    {link: authLink.concat(httpLink), cache: new InMemoryCache()}
);

ReactDOM.render(
    <ApolloProvider client={client}>
        <Helmet>
            <title>{
                    window
                        .location
                        .href
                        .includes('bundang')
                            ? "분당선불폰"
                            : "강남선불폰"
                }</title>
        </Helmet>
        <App/>

    </ApolloProvider>,
    document.getElementById(
        "root"
    )
);
