import { graphql } from "@/shared/api";
import { clearTokens, getRefreshToken } from "@/shared/model/tokens";
import { navigation } from "@/shared/navigation";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "@tanstack/react-router";

const LOGOUT = graphql(/* GraphQL */ `
  mutation logout($refresh_token: String!) {
    logout(refresh_token: $refresh_token)
  }
`);

export const useLogout = () => {
  const navigate = useNavigate();

  const onSettled = async () => {
    clearTokens();
    await navigate({ to: navigation.auth.login });
  };

  return useMutation(LOGOUT, {
    variables: {
      refresh_token: getRefreshToken(),
    },
    onCompleted: onSettled,
    onError: onSettled,
  });
};
