import { RegistrationForm } from "@/features/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/registration")({
  component: RegistrationForm,
});
