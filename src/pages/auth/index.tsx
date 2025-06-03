import { navigation } from "@/shared/navigation";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  beforeLoad: () => {
    throw redirect({
      to: navigation.auth.login,
    });
  },
});
