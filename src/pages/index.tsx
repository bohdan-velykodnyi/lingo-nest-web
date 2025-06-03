import { useUser } from "@/shared/model/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  useUser();
  return <div>Hello </div>;
}
