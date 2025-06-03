import { navigation } from "@/shared/navigation";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_inner/teacher/")({
  beforeLoad: () => {
    throw redirect({
      to: navigation.teacher.dashboard,
    });
  },
});
