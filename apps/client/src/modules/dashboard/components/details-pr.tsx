"use client";
import { GitBranch, GitCommitVertical, Users2Icon } from "lucide-react";
import { usePullRequestsStore } from "../store/pull-requests.store";
import React from "react";
import { Skeleton } from "@/common/components/ui/skeleton";
import ButtonAI from "./ai-button";
import { Separator } from "@/common/components/ui/separator";
import AIReview from "./ai-review";
import { DocumentIcon } from "@/common/components/icons/documents.icon";

const DetailsPR = () => {
  const { pullRequestDetails, pullRequestDetailsLoading, selectedPR } =
    usePullRequestsStore();

  if (!selectedPR) {
    return (
      <div className="flex flex-col relative w-full mt-20 justify-center items-center">
        <DocumentIcon />
        <div className="absolute flex flex-col justify-center items-center -bottom-10">
          <h6 className="md:text-2xl text-xl font-semibold">
            Select a branch, then a pull request
          </h6>
          <p className="md:text-sm text-xs text-muted-foreground">
            Here you can see the details of the documents inside the pull
            request
          </p>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {!!selectedPR && !pullRequestDetailsLoading && (
        <div className="w-full border rounded-md p-5 flex flex-col items-stretch">
          <div className="relative flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {pullRequestDetails?.title}
              </h3>
              <p className="text-sm opacity-50">
                Opened {pullRequestDetails?.created_at}
              </p>
            </div>
            <div className="hidden lg:block w-56">
              <ButtonAI />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h4 className="text-lg font-semibold">Pull Request Details</h4>
            <div className="flex space-y-4 flex-col md:flex-row md:space-y-0 md:space-x-10">
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
          <div className="lg:block hidden">
            <Separator className="my-4" />
            <AIReview />
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
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-10">
              {Array.from({ length: 3 }).map((_, index) => (
                <section key={index} className="flex items-center gap-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col space-y-1">
                    <Skeleton className="h-5 w-20 " />
                    <Skeleton className="h-4 w-10" />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Skeleton>
      )}
    </React.Fragment>
  );
};

export default DetailsPR;
