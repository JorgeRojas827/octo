"use client";
import { GitBranch, GitCommitVertical, Users2Icon } from "lucide-react";
import { usePullRequestsStore } from "../store/pull-requests.store";
import React from "react";
import { Skeleton } from "@/common/components/ui/skeleton";

const DetailsPR = () => {
  const { pullRequestDetails, pullRequestDetailsLoading, selectedPR } =
    usePullRequestsStore();

  return (
    <React.Fragment>
      {!!selectedPR && !pullRequestDetailsLoading && (
        <div className="w-full border mt-4 rounded-md p-5 flex flex-col items-stretch">
          <div>
            <h3 className="text-lg font-semibold">
              {pullRequestDetails?.title}
            </h3>
            <p className="text-sm opacity-50">
              Opened {pullRequestDetails?.created_at}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <h4 className="text-lg font-semibold">Pull Request Details</h4>
            <section className="flex items-center gap-x-4">
              <GitBranch size={24} />
              <div>
                <p className="text-md font-semibold">
                  {pullRequestDetails?.branch}
                </p>
                <p className="text-xs opacity-50">
                  Base branch: {pullRequestDetails?.base_branch}
                </p>
              </div>
            </section>
            <section className="flex items-center gap-x-4">
              <GitCommitVertical size={24} />
              <div>
                <p className="text-md font-semibold">
                  {pullRequestDetails?.commits} commits
                </p>
                <p className="text-xs opacity-50">
                  Last commit {pullRequestDetails?.last_commit_date}
                </p>
              </div>
            </section>
            <section className="flex items-center gap-x-4">
              <Users2Icon size={24} />
              <div>
                <p className="text-md font-semibold">
                  {pullRequestDetails?.reviewers.length} reviewers
                </p>
                <p className="text-xs opacity-50">
                  {pullRequestDetails?.reviewers.join(", ")}
                </p>
              </div>
            </section>
          </div>
        </div>
      )}
      {!!selectedPR && pullRequestDetailsLoading && (
        <Skeleton className="w-full border mt-4 rounded-md p-5 flex flex-col items-stretch">
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="mt-8 space-y-4">
            <Skeleton className="h-6 w-1/2" />
            {Array.from({ length: 3 }).map((_, index) => (
              <section key={index} className="flex items-center gap-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col space-y-1">
                  <Skeleton className="h-5 w-20" />

                  <Skeleton className="h-4 w-10" />
                </div>
              </section>
            ))}
          </div>
        </Skeleton>
      )}
    </React.Fragment>
  );
};

export default DetailsPR;
