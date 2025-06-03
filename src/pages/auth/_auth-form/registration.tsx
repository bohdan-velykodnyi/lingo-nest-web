import { RegistrationForm } from "@/features/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth-form/registration")({
  component: RegistrationForm,
  staticData: {
    auth: {
      tab: "registration",
    },
  },
});
