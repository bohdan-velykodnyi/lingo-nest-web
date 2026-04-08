import { graphql } from "@/shared/api";
import { useMutation } from "@apollo/client/react";
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
      const message = error.message;

      if (message) {
        toast.error(message);
      }

      markFormInvalid();
    },
  });
