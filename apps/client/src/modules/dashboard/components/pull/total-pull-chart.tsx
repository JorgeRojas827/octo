"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/common/components/ui/chart";
import { cn } from "@/lib/cn";
import { usePullRequestsStore } from "../../store/pull-requests.store";
import { useRepositoriesStore } from "../../store/repository.store";
import React from "react";

const chartConfig = {
  total: {
    label: "Total Pull Requests",
    color: "#666",
  },
  merged: {
    label: "Merged Pull Requests",
    color: "#ccc",
  },
} satisfies ChartConfig;

const TotalPullChart = ({ className }: { className?: string }) => {
  const { selectedRepo } = useRepositoriesStore();
  const { pullRequestChart, pullRequestChartLoading } = usePullRequestsStore();
  return (
    <React.Fragment>
      {selectedRepo && !pullRequestChartLoading && (
        <div className={cn("p-4 border rounded-md", className)}>
          <div className="flex flex-col justify-between p-2 mb-10">
            <h3 className="text-xl font-semibold">Pull Request Metrics</h3>
            <span className="text-sm opacity-50">
              Merged percentage: {pullRequestChart?.prMergePercentage}%
            </span>
          </div>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={pullRequestChart?.prByMonth}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="total" fill="var(--color-total)" radius={4} />
              <Bar dataKey="merged" fill="var(--color-merged)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      )}
    </React.Fragment>
  );
};

export default TotalPullChart;
