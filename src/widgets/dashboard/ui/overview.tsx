"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/kit/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", lessons: 12 },
  { month: "February", lessons: 16 },
  { month: "March", lessons: 18 },
  { month: "April", lessons: 14 },
  { month: "May", lessons: 22 },
  { month: "June", lessons: 24 },
  { month: "July", lessons: 28 },
];

const chartConfig = {
  lessons: {
    label: "Lessons",
  },
} satisfies ChartConfig;

interface OverviewProps {
  className?: string;
}

export function Overview({ className }: OverviewProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Lessons Overview</CardTitle>
        <CardDescription>
          Your lesson activity over the past 7 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="lessons" fill="var(--primary)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total lessons for the last 7 months
        </div>
      </CardFooter>
    </Card>
  );
}
