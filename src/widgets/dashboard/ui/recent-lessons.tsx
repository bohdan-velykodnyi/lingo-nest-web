import { Badge } from "@/shared/ui/kit/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";

export function RecentLessons() {
  const lessons = [
    {
      id: "1",
      title: "Advanced Grammar: Past Perfect",
      date: "May 28, 2025",
      status: "completed",
    },
    {
      id: "2",
      title: "Conversation Practice: Travel",
      date: "May 25, 2025",
      status: "completed",
    },
    {
      id: "3",
      title: "Vocabulary: Business Terms",
      date: "May 22, 2025",
      status: "completed",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Lessons</CardTitle>
        <CardDescription>Your recently completed lessons.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {lesson.title}
                </p>
                <p className="text-sm text-muted-foreground">{lesson.date}</p>
              </div>
              <Badge className="text-green-500 border-green-200 bg-green-50">
                Completed
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
