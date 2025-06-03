import { Badge } from "@/shared/ui/kit/badge";
import { Button } from "@/shared/ui/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import { PlayCircle } from "lucide-react";

export function UpcomingLessons() {
  const lessons = [
    {
      id: "1",
      title: "Pronunciation Workshop",
      date: "June 3, 2025 • 10:00 AM",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Reading Comprehension",
      date: "June 5, 2025 • 2:30 PM",
      status: "upcoming",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Lessons</CardTitle>
        <CardDescription>Your scheduled upcoming lessons.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {lesson.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{lesson.date}</p>
                </div>
                <Badge
                  variant="outline"
                  className="text-blue-500 border-blue-200 bg-blue-50"
                >
                  Upcoming
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Lesson
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
