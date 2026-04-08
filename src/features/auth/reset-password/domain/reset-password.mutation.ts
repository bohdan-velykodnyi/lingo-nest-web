import { graphql } from "@/shared/api";
import { navigation } from "@/shared/navigation";
import { useMutation } from "@apollo/client/react";
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
      const message = error.message;

      if (message) {
        toast.error(message);
      }

      markFormInvalid();
    },
  });
};
