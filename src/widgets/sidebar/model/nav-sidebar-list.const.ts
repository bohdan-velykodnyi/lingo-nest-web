import { Archive, BookOpen, Home, Settings, Users } from "lucide-react";

export const navSidebarList = [
  {
    title: "Overview",
    url: "/teacher/dashboard",
    icon: Home,
  },
  {
    title: "Lessons",
    url: "/dashboard/lessons",
    icon: BookOpen,
  },
  {
    title: "Students",
    url: "/dashboard/contacts",
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
