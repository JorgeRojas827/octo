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

const SelectPullRequest = () => {
  const { selectedBranchObject } = useBranchesStore();
  const { selectedRepo } = useRepositoriesStore();
  const enabled = selectedBranchObject.commitSha && selectedRepo;
  const {
    fetchAllPullRequests,
    pullRequests,
    selectedPR,
    setSelectedPR,
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
    <Select
      disabled={!enabled || !pullRequests.length}
      onValueChange={setSelectedPR}
      value={selectedPR}
    >
      <SelectTrigger
        disabled={pullRequestsLoading && !!enabled}
        className="w-full"
      >
        <SelectValue
          placeholder={
            pullRequests.length ? "Select a pull request" : "Nothing is here"
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
                className="overflow-hidden flex items-center gap-x-2"
              >
                <span className="text-purple-600">
                  # {pullRequest.prNumber}{" "}
                </span>
                <span className="opacity-75">/ {pullRequest.title}</span>
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectPullRequest;