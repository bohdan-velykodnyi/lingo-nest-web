import { AuthFormLayout } from "@/pages/-layouts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth-form")({
  component: AuthFormLayout,
});
