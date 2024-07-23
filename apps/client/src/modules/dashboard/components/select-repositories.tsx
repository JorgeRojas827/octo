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
import { useRepositoriesStore } from "../store/repository.store";

export const SelectRepositories = () => {
  const {
    setSelectedRepo,
    selectedRepo,
    repositories,
    fetchAllRepositories,
    repositoriesLoading,
  } = useRepositoriesStore();

  useEffect(() => {
    fetchAllRepositories();
  }, []);

  return (
    <Select
      onValueChange={setSelectedRepo}
      disabled={repositoriesLoading}
      value={selectedRepo}
    >
      <SelectTrigger disabled={repositoriesLoading} className="w-[180px]">
        <SelectValue placeholder="Repository" />
      </SelectTrigger>
      <SelectContent>
        {repositories?.map((repository) => (
          <SelectItem key={repository.id} value={repository.name}>
            {repository.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
