import { Dashboard } from "@/widgets";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_inner/student/dashboard")({
  component: Dashboard,
});
