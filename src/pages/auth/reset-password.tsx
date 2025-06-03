import { ResetPassword } from "@/features/auth";
import { navigation } from "@/shared/navigation";
import { createFileRoute, redirect } from "@tanstack/react-router";

type Search = {
  token: string;
};

export const Route = createFileRoute("/auth/reset-password")({
  component: ResetPassword,
  validateSearch: (search: Record<string, unknown>): Search => ({
    token: (search.token as string) || "",
  }),
  beforeLoad: ({ search }) => {
    if (!search.token) {
      throw redirect({
        to: navigation.auth.login,
      });
    }
  },
});
