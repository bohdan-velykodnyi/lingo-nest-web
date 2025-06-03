import { graphql } from "@/shared/api";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";

const REGISTRATION = graphql(/* GraphQL */ `
  mutation registration($email: String!, $password: String!, $role: UserRole!) {
    registration(
      credentials: { email: $email, password: $password, role: $role }
    ) {
      id
    }
  }
`);

export const useRegistrationMutation = (markFormInvalid: () => void) =>
  useMutation(REGISTRATION, {
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
