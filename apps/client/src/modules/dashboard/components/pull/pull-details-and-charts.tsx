"use client";

import TotalCommitsChart from "./total-commits-chart";
import TotalPullChart from "./total-pull-chart";
import { TimePullChart } from "./time-pull-chart";
import { useEffect } from "react";
import { driverObject } from "@/lib/driver";
import { useTutorialStore } from "@/modules/tutorial/store";

const PullDetailsAndCharts = () => {
  const { metricsShown, changeShown } = useTutorialStore();

  useEffect(() => {
    if (metricsShown === false) {
      driverObject.highlight({
        element: "#show-metrics",
        popover: {
          align: "center",
          title: "Pull Request Metrics",
          description:
            "View the metrics about PR Performance, Merged Pull Requests and Commits.",
        },
      });

      changeShown("metricsShown");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="show-metrics">
      <TimePullChart className="col-span-1" />
      <TotalPullChart className="col-span-1" />
      <TotalCommitsChart className="col-span-1" />
    </div>
  );
};

export default PullDetailsAndCharts;
