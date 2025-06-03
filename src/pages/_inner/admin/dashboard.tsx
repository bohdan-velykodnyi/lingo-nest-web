import { useUser } from "@/shared/model/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_inner/admin/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  useUser();
  return <div>Admin Dashboard!</div>;
}
