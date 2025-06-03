import { AuthLayout } from "@/pages/-layouts";
import { unauthorizedGuard } from "@/shared/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
  beforeLoad: unauthorizedGuard,
});
