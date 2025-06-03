import { graphql } from "@/shared/api";
import { navigation } from "@/shared/navigation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const RESET_PASSWORD = graphql(/* GraphQL */ `
  mutation resetPassword($resetPasswordDto: ResetPasswordDto!) {
    resetPassword(resetPasswordDto: $resetPasswordDto)
  }
`);

export const useResetPasswordMutation = (markFormInvalid: () => void) => {
  const navigate = useNavigate();

  return useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      navigate({ to: navigation.auth.login });
      toast.success("Password reset successfully");
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
};
