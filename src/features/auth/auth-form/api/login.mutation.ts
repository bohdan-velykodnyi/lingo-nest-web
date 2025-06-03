import { graphql } from "@/shared/api";
import { setTokens } from "@/shared/model/tokens";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";

const LOGIN = graphql(/* GraphQL */ `
  mutation login($email: String!, $password: String!) {
    login(credentials: { email: $email, password: $password }) {
      access_token
      refresh_token
    }
  }
`);

export const useLoginMutation = (markFormInvalid: () => void) =>
  useMutation(LOGIN, {
    onCompleted: (data) => {
      const { access_token, refresh_token } = data.login;

      setTokens({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
    },
    onError: (error) => {
      error.graphQLErrors.forEach((err) => {
        const message = err.extensions?.message as string;

        if (message) {
          toast.error(message);
        }
      });

      markFormInvalid();
    },
  });
