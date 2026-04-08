import { navigation } from "@/shared/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import { Link } from "@tanstack/react-router";
import { BookPlus, PlayCircle, Send, Users } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "Create Lesson",
      description: "Design a new lesson plan",
      icon: BookPlus,
      href: "/dashboard/lessons/create",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Start Lesson",
      description: "Begin a scheduled lesson",
      icon: PlayCircle,
      href: "/dashboard/lessons",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Send Homework",
      description: "Assign tasks to students",
      icon: Send,
      href: "/dashboard/lessons/homework",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Manage Contacts",
      description: "View and edit students",
      icon: Users,
      href: navigation.teacher.contacts,
      color: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Card key={action.title} className="overflow-hidden hover:opacity-70">
          <Link to={action.href} className="block h-full">
            <CardHeader className="pb-2">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color}`}
              >
                <action.icon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <CardDescription className="mt-2">
                {action.description}
              </CardDescription>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
