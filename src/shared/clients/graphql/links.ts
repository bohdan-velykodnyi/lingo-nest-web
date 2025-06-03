/* eslint-disable no-console */
import { CONFIG } from "@/shared/config.ts";
import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: CONFIG.API_BASE_URL,
});

const JWT_EXPIRED_ERROR = "User is not authenticated";

export const wsLink = new GraphQLWsLink(
  createClient({
    url: CONFIG.WS_BASE_URL,
    shouldRetry: () => true,
    retryAttempts: 5,
    retryWait: (count) =>
      new Promise((resolve) => {
        setTimeout(resolve, Math.min(count * 1000, 30000));
      }),
    lazy: true,
    lazyCloseTimeout: 10000,
    on: {
      connected: () => {
        console.log("GQL WS connection established");
      },
      error: (error) => {
        console.log("GQL WS Error", error);
      },
      closed: () => {
        console.log("GQL WS connection closed");
      },
    },
  })
);

export const authLink = setContext(async (_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");

  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

// Split traffic between ws and http
export const fullLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.message === JWT_EXPIRED_ERROR) {
        console.log("JWT expired");
      }
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});
