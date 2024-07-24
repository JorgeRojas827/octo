import { create } from "zustand";
import { getAllPullRequests } from "../services/pull-request.service";
import {
  IPullRequest,
  IPullRequestCounter,
} from "../interfaces/pull-request.interface";

interface IPullRequestsState {
  selectedPR: string;
  selectedNumberPR: string;
  pullRequests: IPullRequest[];
  pullRequestsLoading: boolean;
  countPRs: IPullRequestCounter | null;
  countPRLoading: boolean;
  setSelectedNumberPR: (number: string) => void;
  setSelectedPR: (repo: string) => void;
  clearPullRequest: () => Promise<void>;
  fetchAllPullRequests: (
    repository: string,
    commitSha: string
  ) => Promise<void>;
}

export const usePullRequestsStore = create<IPullRequestsState>((set) => ({
  selectedPR: "",
  selectedNumberPR: "",
  pullRequests: [],
  pullRequestsLoading: true,
  countPRLoading: true,
  countPRs: null,
  setSelectedPR: (repo) => set(() => ({ selectedPR: repo })),
  setSelectedNumberPR: (number) => set(() => ({ selectedNumberPR: number })),
  clearPullRequest: () =>
    new Promise((resolve) => {
      set(() => ({ selectedPR: "" }));
      resolve();
    }),
  fetchAllPullRequests: async (repository: string, commitSha: string) => {
    const pullRequests = await getAllPullRequests(repository, commitSha);
    set(() => ({ pullRequestsLoading: false }));

    set(() => ({ pullRequests: pullRequests.data || [] }));
  },
}));
