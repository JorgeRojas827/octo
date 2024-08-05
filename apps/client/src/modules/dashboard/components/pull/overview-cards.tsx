"use client";
import React from "react";
import { usePullRequestsStore } from "../../store/pull-requests.store";
import { useRepositoriesStore } from "../../store/repository.store";
import { Skeleton } from "@/common/components/ui/skeleton";

const OverviewCards = () => {
  const { countPRs, countPRLoading } = usePullRequestsStore();
  const { selectedRepo } = useRepositoriesStore();

  return (
    <React.Fragment>
      {!countPRLoading && selectedRepo && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-2 rounded-md border space-y-2">
            <h5 className="text-base text-center ">Total Pull Request</h5>
            <p className="text-4xl font-bold text-center">
              {countPRs?.totalPRs}
            </p>
          </div>
          <div className="p-2 rounded-md border space-y-2">
            <h5 className="text-base text-center">Open Pull Request</h5>
            <p className="text-4xl font-bold text-center">
              {countPRs?.openPRs}
            </p>
          </div>
          <div className="p-2 rounded-md border space-y-2">
            <h5 className="text-base text-center">Closed Pull Request</h5>
            <p className="text-4xl font-bold text-center">
              {countPRs?.closedPRs}
            </p>
          </div>
          <div className="p-2 rounded-md border space-y-2">
            <h5 className="text-base text-center">Merged Pull Request</h5>
            <p className="text-4xl font-bold text-center">
              {countPRs?.mergedPRs}
            </p>
          </div>
        </div>
      )}
      {countPRLoading && selectedRepo && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="p-2 rounded-md border flex justify-center items-center flex-col space-y-3"
            >
              <Skeleton className="h-4 w-3/4"></Skeleton>
              <Skeleton className="h-12 w-[50px]"></Skeleton>
            </Skeleton>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default OverviewCards;
