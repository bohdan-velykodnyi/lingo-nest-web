import { Overview } from "./overview";
import { QuickActions } from "./quick-actions";
import { RecentLessons } from "./recent-lessons";
import { UpcomingLessons } from "./upcoming-lessons";

export const Dashboard = () => (
  <div className="flex flex-1 flex-col space-y-6">
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to NestLingo! Manage your language learning journey.
        </p>
      </div>
    </div>

    <QuickActions />

    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-[1fr_1fr]">
      <Overview />
      <div className="space-y-4">
        <UpcomingLessons />
        <RecentLessons />
      </div>
    </div>
  </div>
);
