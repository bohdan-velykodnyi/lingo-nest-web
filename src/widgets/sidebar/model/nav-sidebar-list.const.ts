import { navigation } from "@/shared/navigation";
import { Archive, BookOpen, Home, Settings, Users } from "lucide-react";

export const navSidebarList = [
  {
    title: "Overview",
    url: navigation.teacher.dashboard,
    icon: Home,
  },
  {
    title: "Lessons",
    url: "/dashboard/lessons",
    icon: BookOpen,
  },
  {
    title: "Students",
    url: navigation.teacher.contacts,
    icon: Users,
  },
  {
    title: "Archive",
    url: "/dashboard/archive",
    icon: Archive,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: Settings,
  },
];
