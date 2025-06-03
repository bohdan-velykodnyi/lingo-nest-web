import { graphql } from "@/shared/api";
import { useMutation } from "@apollo/client";

const LOGIN = graphql(/* GraphQL */ `
  mutation login($email: String!, $password: String!) {
    login(credentials: { email: $email, password: $password }) {
      access_token
      refresh_token
    }
  }
`);

export const useLoginMutation = () => useMutation(LOGIN);
