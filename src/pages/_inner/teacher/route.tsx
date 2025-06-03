import { TeacherLayout } from "@/pages/-layouts";
import { teacherGuard } from "@/shared/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_inner/teacher")({
  component: TeacherLayout,
  beforeLoad: teacherGuard,
});
