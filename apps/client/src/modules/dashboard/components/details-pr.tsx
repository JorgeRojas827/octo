"use client";
import { GitBranch, GitCommitVertical, Users2Icon } from "lucide-react";
import { usePullRequestsStore } from "../store/pull-requests.store";

const DetailsPR = () => {
  const { pullRequestDetails } = usePullRequestsStore();

  return (
    <div className="w-full border mt-4 rounded-md p-3 flex flex-col h- items-stretch">
      <div>
        <h3 className="text-xl font-semibold">{pullRequestDetails?.title}</h3>
        <p className="text-sm opacity-50">
          Opened {pullRequestDetails?.created_at}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <h4 className="text-xl font-semibold">Pull Request Details</h4>
        <section className="flex items-center gap-x-4">
          <GitBranch size={24} />
          <div>
            <p className="text-lg font-semibold">
              {pullRequestDetails?.branch}
            </p>
            <p className="text-sm opacity-50">
              Base branch: {pullRequestDetails?.base_branch}
            </p>
          </div>
        </section>
        <section className="flex items-center gap-x-4">
          <GitCommitVertical size={24} />
          <div>
            <p className="text-lg font-semibold">
              {pullRequestDetails?.commits} commits
            </p>
            <p className="text-sm opacity-50">
              Last commit {pullRequestDetails?.last_commit_date}
            </p>
          </div>
        </section>
        <section className="flex items-center gap-x-4">
          <Users2Icon size={24} />
          <div>
            <p className="text-lg font-semibold">
              {pullRequestDetails?.reviewers.length} reviewers
            </p>
            <p className="text-sm opacity-50">
              {pullRequestDetails?.reviewers.join(", ")}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailsPR;
