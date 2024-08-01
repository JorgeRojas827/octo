/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/common/components/ui/select";
import { usePullRequestsStore } from "../store/pull-requests.store";
import { useEffect } from "react";
import { useBranchesStore } from "../store/branch.store";
import { useRepositoriesStore } from "../store/repository.store";

export const SelectPullRequest = () => {
  const { selectedBranchObject } = useBranchesStore();
  const { selectedRepo } = useRepositoriesStore();
  const enabled = selectedBranchObject.commitSha && selectedRepo;
  const {
    fetchAllPullRequests,
    pullRequests,
    selectedPR,
    setSelectedPR,
    setSelectedNumberPR,
    clearPullRequest,
    pullRequestsLoading,
  } = usePullRequestsStore();

  useEffect(() => {
    if (enabled) {
      clearPullRequest().then(() =>
        fetchAllPullRequests(selectedRepo, selectedBranchObject.commitSha)
      );
    }
  }, [selectedBranchObject.commitSha, selectedRepo]);

  return (
    <div className="space-y-2">
      <label>Pull Request</label>
      <Select
        disabled={!enabled || !pullRequests.length}
        onValueChange={(value) => {
          setSelectedPR(value);
          const selectedNumberPR = pullRequests.find(
            (pr) => pr.title === value
          )?.prNumber;
          setSelectedNumberPR(String(selectedNumberPR));
        }}
        value={selectedPR}
      >
        <SelectTrigger
          disabled={pullRequestsLoading && !!enabled}
          className="w-full"
        >
          <SelectValue
            placeholder={
              !selectedBranchObject.commitSha ||
              (!!selectedBranchObject.commitSha && pullRequests.length) ||
              pullRequestsLoading
                ? "Select a pull request"
                : !pullRequests.length &&
                  selectedBranchObject.commitSha &&
                  "Nothing is here"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pullRequests &&
              pullRequests.map((pullRequest) => (
                <SelectItem
                  key={pullRequest.prNumber}
                  value={pullRequest.title}
                  className="overflow-hidden flex items-center"
                >
                  <span className="text-purple-600">
                    # {pullRequest.prNumber}
                  </span>
                  <span className="opacity-75"> / {pullRequest.title}</span>
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
