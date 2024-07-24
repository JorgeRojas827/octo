/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { useBranchesStore } from "../store/branch.store";
import { useRepositoriesStore } from "../store/repository.store";

export const SelectBranches = () => {
  const { selectedRepo } = useRepositoriesStore();
  const {
    branches,
    setSelectedBranch,
    selectedBranch,
    fetchAllBranches,
    clearSelectedBranch,
    branchesLoading,
  } = useBranchesStore();

  useEffect(() => {
    if (selectedRepo) {
      clearSelectedBranch().then(() => fetchAllBranches(selectedRepo));
    }
  }, [selectedRepo]);

  return (
    <Select
      disabled={!selectedRepo || branchesLoading}
      onValueChange={setSelectedBranch}
      value={selectedBranch}
    >
      <SelectTrigger
        disabled={branchesLoading && !!selectedRepo}
        className="w-[180px]"
      >
        <SelectValue placeholder="Select a branch" />
      </SelectTrigger>
      <SelectContent>
        {branches &&
          branches.map((branch) => (
            <SelectItem key={branch.name} value={branch.name}>
              {branch.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
