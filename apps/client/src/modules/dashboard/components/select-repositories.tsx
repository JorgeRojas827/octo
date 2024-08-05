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
import { driverObject } from "@/lib/driver";
import { useTutorialStore } from "@/modules/tutorial/store";

export const SelectRepositories = () => {
  const {
    setSelectedRepo,
    selectedRepo,
    repositories,
    fetchAllRepositories,
    repositoriesLoading,
  } = useRepositoriesStore();
  const { repositoryShown, changeShown, _hasHydrated } = useTutorialStore();

  console.log({ repositoryShown });
  useEffect(() => {
    fetchAllRepositories();

    if (repositoryShown === false && _hasHydrated) {
      driverObject.highlight({
        element: "#select-repository",
        popover: {
          title: "Select a repository",
          description: "Choose a repository to view its metrics and more.",
        },
      });

      changeShown("repositoryShown");
    }
  }, [_hasHydrated]);

  return (
    <div className="space-y-2">
      <label>Repository</label>
      <Select
        onValueChange={setSelectedRepo}
        disabled={repositoriesLoading}
        value={selectedRepo}
      >
        <SelectTrigger disabled={repositoriesLoading} id="select-repository">
          <SelectValue placeholder="Select a repository" />
        </SelectTrigger>
        <SelectContent>
          {repositories?.map((repository) => (
            <SelectItem key={repository.id} value={repository.name}>
              {repository.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
