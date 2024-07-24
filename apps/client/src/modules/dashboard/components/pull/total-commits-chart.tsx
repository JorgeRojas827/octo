"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { cn } from "@/lib/cn";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/ui/chart";
import { useRepositoriesStore } from "../../store/repository.store";
import React from "react";

const chartConfig = {
  count: {
    label: "Commits",
    color: "#666",
  },
} satisfies ChartConfig;

// convert yyyy-mm-dd into dd/mm
const formatMonth = (date: string) => {
  const [_, month, day] = date.split("-");
  return `${month}/${day}`;
};

const TotalCommitsChart = ({ className }: { className?: string }) => {
  const { selectedRepo, commitChart, commitChartLoading } =
    useRepositoriesStore();

  return (
    <React.Fragment>
      {selectedRepo && !commitChartLoading && (
        <div className={cn("p-4 border rounded-md", className)}>
          <div className="flex flex-col justify-between p-2 mb-10">
            <h3 className="text-xl font-semibold">Commit metrics</h3>
            <span className="text-sm opacity-50">
              Average per day: {commitChart?.commitsByMonthAverage.toFixed(2)}{" "}
              commits
            </span>
          </div>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <AreaChart data={commitChart?.commitsByMonth.reverse()}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => formatMonth(value)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="count"
                fill="var(--color-count)"
                stroke="var(--color-count)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      )}
    </React.Fragment>
  );
};

export default TotalCommitsChart;
