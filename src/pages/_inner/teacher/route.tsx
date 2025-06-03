import { teacherGuard } from "@/shared/guards";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_inner/teacher")({
  component: Outlet,
  beforeLoad: teacherGuard,
});
