"use client";

import { useRepositoriesStore } from "../store/repository.store";

const RepositoryName = () => {
  const { selectedRepo } = useRepositoriesStore();

  return (
    <h3 className="text-xl font-semibold mb-4 flex gap-x-2">
      {selectedRepo ? (
        <p className="text-purple-600">{selectedRepo}</p>
      ) : (
        <p className="text-purple-600">Select a repo</p>
      )}{" "}
      / Overview
    </h3>
  );
};

export default RepositoryName;
