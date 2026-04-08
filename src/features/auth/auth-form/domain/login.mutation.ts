import { graphql } from "@/shared/api";
import { setTokens } from "@/shared/model/tokens";
import { navigation } from "@/shared/navigation";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const LOGIN = graphql(/* GraphQL */ `
  mutation login($email: String!, $password: String!) {
    login(credentials: { email: $email, password: $password }) {
      access_token
      refresh_token
    }
  }
`);

export const useLoginMutation = (markFormInvalid: () => void) => {
  const navigate = useNavigate();

  return useMutation(LOGIN, {
    onCompleted: (data) => {
      const { access_token, refresh_token } = data.login;

      setTokens({
        accessToken: access_token,
        refreshToken: refresh_token,
      });

      navigate({
        to: navigation.teacher.dashboard,
      });
    },
    onError: (error) => {
      const message = error.message;

      if (message) {
        toast.error(message);
      }

      markFormInvalid();
    },
  });
};
