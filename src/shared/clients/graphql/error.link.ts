import {
  clearTokens,
  getRefreshToken,
  refreshTokens,
  setTokens,
} from "@/shared/model/tokens";
import { router } from "@/shared/router";
import { type ApolloLink, CombinedGraphQLErrors } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { filter, from, switchMap } from "rxjs";

interface PendingRequest {
  resolve: ResolveForward;
  operation: ApolloLink.Operation;
}

type ResolveForward = (value: ApolloLink.Operation) => void;

const JWT_EXPIRED_ERROR = "Unauthorized";

const pendingRequests: PendingRequest[] = [];
let isRefreshProcessStarted = false;

const getNewToken = async () => {
  try {
    isRefreshProcessStarted = true;
    const tokens = await refreshTokens();

    setTokens(tokens);
    resolvePendingRequests(tokens.accessToken);
  } catch {
    clearTokens();
    router.invalidate();
  } finally {
    isRefreshProcessStarted = false;
  }
};

const resolvePendingRequests = (accessToken: string) => {
  pendingRequests.map((request) => {
    const { resolve, operation } = request;
    const oldHeaders = operation.getContext().headers;

    operation.setContext({
      headers: {
        ...oldHeaders,
        authorization: `Bearer ${accessToken}`,
      },
    });
    resolve(operation);
  });

  pendingRequests.length = 0;
};

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!CombinedGraphQLErrors.is(error)) {
    return undefined;
  }

  for (const err of error.errors) {
    switch (err.message) {
      case JWT_EXPIRED_ERROR:
        if (operation.operationName === "refreshTokens" || !getRefreshToken()) {
          clearTokens();
          router.invalidate();
          return undefined;
        }

        if (!isRefreshProcessStarted) {
          isRefreshProcessStarted = true;
          getNewToken();
        }

        return from(
          new Promise<ApolloLink.Operation>((resolve: ResolveForward) =>
            pendingRequests.push({ resolve, operation }),
          ),
        ).pipe(
          filter(Boolean),
          switchMap((newOperation: ApolloLink.Operation) =>
            forward(newOperation),
          ),
        );
    }
  }

  return undefined;
});
