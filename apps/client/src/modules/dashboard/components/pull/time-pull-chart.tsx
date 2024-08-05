"use client";

import { CircleAlertIcon, TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/ui/chart";
import { usePullRequestsStore } from "../../store/pull-requests.store";
import { useRepositoriesStore } from "../../store/repository.store";
import * as React from "react";
import { Skeleton } from "@/common/components/ui/skeleton";
import { cn } from "@/lib/cn";

const chartConfig = {
  hours: {
    label: "hours",
    color: "#666",
  },
} satisfies ChartConfig;

export function TimePullChart({ className }: { className?: string }) {
  const { selectedRepo } = useRepositoriesStore();
  const { pullRequestTimeChart, pullRequestChartLoading } =
    usePullRequestsStore();

  const haveData =
    typeof pullRequestTimeChart?.openToClose === "number" ||
    typeof pullRequestTimeChart?.openToMerge === "number" ||
    typeof pullRequestTimeChart?.timeToFirstReview === "number" ||
    typeof pullRequestTimeChart?.lastReviewToMerge === "number";

  const chartData = [
    {
      label: "TCR",
      hours: pullRequestTimeChart?.openToClose?.toFixed(3),
    },
    {
      label: "TMR",
      hours: pullRequestTimeChart?.openToMerge?.toFixed(3),
    },
    {
      label: "TFR",
      hours: pullRequestTimeChart?.timeToFirstReview?.toFixed(3),
    },
    {
      label: "TLR",
      hours: pullRequestTimeChart?.lastReviewToMerge?.toFixed(3),
    },
  ];

  return (
    <React.Fragment>
      {selectedRepo && !pullRequestChartLoading && (
        <div className={cn("p-4 border w-full h-full rounded-md")}>
          <div className="flex flex-col justify-between p-2 mb-3">
            <h3 className="text-xl font-semibold">Pull Request Performance</h3>
            <span className="text-sm opacity-50">Average time in hours</span>
          </div>
          {haveData ? (
            <>
              <ChartContainer
                config={chartConfig}
                className="w-full aspect-square max-h-[250px]"
              >
                <RadarChart data={chartData}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <PolarAngleAxis dataKey="label" />
                  <PolarGrid />
                  <Radar
                    dataKey="hours"
                    fill="var(--color-hours)"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ChartContainer>

              <CardFooter className="flex gap-2 pb-3 flex-col text-sm">
                <div className="flex justify-between w-full text-xs">
                  <div className="flex items-center gap-1 text-left font-medium leading-none">
                    TCR:
                    <span className="leading-none text-muted-foreground">
                      Time to close PR
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-left font-medium leading-none">
                    TMR:
                    <span className="leading-none text-muted-foreground">
                      Time to merge PR
                    </span>
                  </div>
                </div>
                <div className="flex justify-between w-full text-xs">
                  <div className="flex items-center gap-1 text-left font-medium leading-none">
                    TFR:
                    <span className="leading-none text-muted-foreground">
                      Time for first review
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-left font-medium leading-none">
                    TLR:
                    <span className="leading-none text-muted-foreground">
                      Time for last review
                    </span>
                  </div>
                </div>
              </CardFooter>
            </>
          ) : (
            <div className="flex items-center space-y-2 flex-col justify-center h-48">
              <CircleAlertIcon className="text-gray-500" />
              <p className="text-sm text-gray-500">No data available</p>
            </div>
          )}
        </div>
      )}
      {selectedRepo && pullRequestChartLoading && (
        <Skeleton className={cn("p-6 border rounded-md")}>
          <div className="flex flex-col justify-between space-y-2 mb-10">
            <Skeleton className="w-2/4 h-6" />
            <Skeleton className="w-3/4 h-4" />
          </div>
          <div>
            <Skeleton className="w-full h-48" />
            <div className="mt-5 flex items-center justify-center space-x-6">
              <Skeleton className="w-6 h-4" />
              <Skeleton className="w-6 h-4" />
              <Skeleton className="w-6 h-4" />
              <Skeleton className="w-6 h-4" />
              <Skeleton className="w-6 h-4" />
            </div>
          </div>
        </Skeleton>
      )}
    </React.Fragment>
  );
}
