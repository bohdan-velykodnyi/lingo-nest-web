import {
  clearTokens,
  getRefreshToken,
  refreshTokens,
  setTokens,
} from "@/shared/model/tokens";
import { router } from "@/shared/router";
import { fromPromise, type Operation } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

interface PendingRequest {
  resolve: ResolveForward;
  operation: Operation;
}

type ResolveForward = (value: Operation) => void;

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

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors) {
    return forward(operation);
  }

  for (const err of graphQLErrors) {
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

        return fromPromise(
          new Promise((resolve: ResolveForward) =>
            pendingRequests.push({ resolve, operation }),
          ),
        )
          .filter((value) => Boolean(value))
          .flatMap((newOperation: Operation) => forward(newOperation));
    }
  }

  return forward(operation);
});
