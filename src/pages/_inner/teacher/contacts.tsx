import { Contacts } from "@/widgets/contacts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_inner/teacher/contacts")({
  component: Contacts,
});
