"use client";

import React from "react";
import { useRepositoriesStore } from "../store/repository.store";

const RepositoryName = () => {
  const { selectedRepo } = useRepositoriesStore();

  return (
    <React.Fragment>
      {selectedRepo && (
        <h3 className="text-xl font-semibold mb-4 flex gap-x-2">
          <p className="text-purple-600">{selectedRepo || "Select a repo"}</p>/
          Overview
        </h3>
      )}
    </React.Fragment>
  );
};

export default RepositoryName;
