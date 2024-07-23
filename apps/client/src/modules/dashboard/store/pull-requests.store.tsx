import { create } from "zustand";
import { getAllPullRequests } from "../services/pull-request.service";
import { IPullRequest } from "../interfaces/pull-request.interface";

interface IPullRequestsState {
  selectedPR: string;
  setSelectedPR: (repo: string) => void;
  pullRequests: IPullRequest[];
  fetchAllPullRequests: (
    repository: string,
    commitSha: string
  ) => Promise<void>;
  clearPullRequest: () => Promise<void>;
}

export const usePullRequestsStore = create<IPullRequestsState>((set) => ({
  selectedPR: "",
  setSelectedPR: (repo) => set(() => ({ selectedPR: repo })),
  pullRequests: [],
  fetchAllPullRequests: async (repository: string, commitSha: string) => {
    const pullRequests = await getAllPullRequests(repository, commitSha);

    set(() => ({ pullRequests: pullRequests.data || [] }));
  },
  clearPullRequest: () =>
    new Promise((resolve) => {
      set(() => ({ selectedPR: "" }));
      resolve();
    }),
}));
