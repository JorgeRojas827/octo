import { create } from "zustand";
import { getAllPullRequests } from "../services/pull-request.service";
import {
  IPullRequest,
  IPullRequestCounter,
} from "../interfaces/pull-request.interface";

interface IPullRequestsState {
  selectedPR: string;
  setSelectedPR: (repo: string) => void;
  pullRequests: IPullRequest[];
  fetchAllPullRequests: (
    repository: string,
    commitSha: string
  ) => Promise<void>;
  pullRequestsLoading: boolean;
  clearPullRequest: () => Promise<void>;
  countPRs: IPullRequestCounter | null;
  countPRLoading: boolean;
}

export const usePullRequestsStore = create<IPullRequestsState>((set) => ({
  selectedPR: "",
  setSelectedPR: (repo) => set(() => ({ selectedPR: repo })),
  pullRequests: [],
  fetchAllPullRequests: async (repository: string, commitSha: string) => {
    const pullRequests = await getAllPullRequests(repository, commitSha);
    set(() => ({ pullRequestsLoading: false }));

    set(() => ({ pullRequests: pullRequests.data || [] }));
  },
  clearPullRequest: () =>
    new Promise((resolve) => {
      set(() => ({ selectedPR: "" }));
      resolve();
    }),
  pullRequestsLoading: true,
  countPRLoading: true,
  countPRs: null,
}));
