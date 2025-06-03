import { CONFIG } from "@/shared/config";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const REFRESH_TOKEN_STR = `
mutation refreshTokens ($refresh_token: String!) {
  refreshTokens(refresh_token: $refresh_token) {
    access_token
    refresh_token
  }
}
`;

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const setTokens = (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const refreshTokens = async () => {
  const refresh_token = getRefreshToken();

  const { data } = await (
    await fetch(CONFIG.API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        query: REFRESH_TOKEN_STR,
        variables: {
          refresh_token,
        },
      }),
    })
  ).json();

  return {
    accessToken: data.refreshTokens.access_token,
    refreshToken: data.refreshTokens.refresh_token,
  };
};
