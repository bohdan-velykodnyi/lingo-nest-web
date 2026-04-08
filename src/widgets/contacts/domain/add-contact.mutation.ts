import type { ErrorLike } from "@apollo/client";

import { graphql } from "@/shared/api";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

const ADD_CONTACT = graphql(/* GraphQL */ `
  mutation addContact($email: String!) {
    addContact(email: $email) {
      ... on Contact {
        id
        created_at
        status
        requester {
          id
          name
          role
          email
        }
        receiver {
          id
          name
          role
          email
        }
      }

      ... on ContactInvite {
        id
        invited_email
      }
    }
  }
`);

export const useAddContactMutation = () => {
  const handleError = (error: ErrorLike) => {
    const message = error.message;

    if (message) {
      toast.error(message);
    }
  };

  const mutation = useMutation(ADD_CONTACT, {
    onCompleted: () => {
      toast.success("Contact added successfully!");
    },
    onError: handleError,
  });

  return {
    mutation,
    handleError,
  };
};
