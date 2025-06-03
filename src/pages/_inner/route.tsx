import { authorizedGuard } from "@/shared/guards";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_inner")({
  component: Outlet,
  beforeLoad: authorizedGuard,
});
