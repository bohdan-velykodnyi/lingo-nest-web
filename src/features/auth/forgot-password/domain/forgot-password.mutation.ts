import { graphql } from "@/shared/api";
import { navigation } from "@/shared/navigation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const FORGOT_PASSWORD = graphql(/* GraphQL */ `
  mutation forgotPassword($forgotPasswordDto: ForgotPasswordDto!) {
    forgotPassword(forgotPasswordDto: $forgotPasswordDto)
  }
`);

export const useForgotPasswordMutation = (markFormInvalid: () => void) => {
  const navigate = useNavigate();

  return useMutation(FORGOT_PASSWORD, {
    onCompleted: () => {
      navigate({ to: navigation.auth.login });
      toast.success("Password reset link sent to your email");
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
