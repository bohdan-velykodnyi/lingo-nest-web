import { LoginForm } from "@/features/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth-form/login")({
  component: LoginForm,
  staticData: {
    auth: {
      tab: "login",
    },
  },
});
