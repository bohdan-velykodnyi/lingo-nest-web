import { adminGuard } from "@/shared/guards";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_inner/admin")({
  component: Outlet,
  beforeLoad: adminGuard,
});
