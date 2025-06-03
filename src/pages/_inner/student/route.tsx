import { studentGuard } from "@/shared/guards";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_inner/student")({
  component: Outlet,
  beforeLoad: studentGuard,
});
