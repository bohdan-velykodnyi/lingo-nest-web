import { navigation } from "@/shared/navigation";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_inner/student/")({
  beforeLoad: () => {
    throw redirect({
      to: navigation.student.dashboard,
    });
  },
});
