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
import { Skeleton } from "@/common/components/ui/skeleton";
import { CircleAlertIcon } from "lucide-react";

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
            {!!pullRequestChart?.prByMonth.length && (
              <span className="text-sm opacity-50">
                Merged percentage: {pullRequestChart?.prMergePercentage}%
              </span>
            )}
          </div>
          {pullRequestChart?.prByMonth.length ? (
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
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
                <Bar
                  dataKey="total"
                  fill="var(--color-total)"
                  fillOpacity={0.4}
                  radius={4}
                />
                <Bar
                  dataKey="merged"
                  fill="var(--color-merged)"
                  fillOpacity={0.4}
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center space-y-2 flex-col justify-center h-48">
              <CircleAlertIcon className="text-gray-500" />
              <p className="text-sm text-gray-500">No data available</p>
            </div>
          )}
        </div>
      )}
      {selectedRepo && pullRequestChartLoading && (
        <Skeleton className={cn("p-6 border rounded-md", className)}>
          <div className="flex flex-col justify-between space-y-2 mb-10">
            <Skeleton className="w-2/4 h-6" />
            <Skeleton className="w-3/4 h-4" />
          </div>
          <div>
            <Skeleton className="w-full h-48" />
            <div className="mt-5 flex items-center justify-center space-x-8">
              <Skeleton className="w-1/4 h-4" />
              <Skeleton className="w-1/4 h-4" />
            </div>
          </div>
        </Skeleton>
      )}
    </React.Fragment>
  );
};

export default TotalPullChart;
