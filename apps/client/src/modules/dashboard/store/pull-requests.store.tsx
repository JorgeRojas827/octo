import { create } from "zustand";
import {
  getAllPullRequests,
  getPullRequestDetails,
} from "../services/pull-request.service";
import {
  IPullRequest,
  IPullRequestCounter,
  IPullRequestDetails,
  IPullRequestsChart,
  IPullRequestTimeChart,
} from "../interfaces/pull-request.interface";
import { useRepositoriesStore } from "./repository.store";

interface IPullRequestsState {
  selectedPR: string;
  setSelectedPR: (repo: string) => void;

  fetchAllPullRequests: (
    repository: string,
    commitSha: string
  ) => Promise<void>;
  pullRequests: IPullRequest[];
  pullRequestsLoading: boolean;
  clearPullRequest: () => Promise<void>;

  countPRs: IPullRequestCounter | null;
  countPRLoading: boolean;

  pullRequestChart: IPullRequestsChart | null;
  pullRequestChartLoading: boolean;

  fetchPullRequestDetails: (repository: string) => Promise<void>;
  pullRequestDetails: IPullRequestDetails | null;
  pullRequestDetailsLoading: boolean;

  pullRequestTimeChart: Partial<IPullRequestTimeChart> | null;
  pullRequestTimeChartLoading: boolean;
}

export const usePullRequestsStore = create<IPullRequestsState>((set, get) => ({
  selectedPR: "",
  setSelectedPR: (pr) => {
    set(() => ({ selectedPR: pr }));
    get().fetchPullRequestDetails(useRepositoriesStore.getState().selectedRepo);
  },

  fetchAllPullRequests: async (repository: string, commitSha: string) => {
    const pullRequests = await getAllPullRequests(repository, commitSha);
    set(() => ({ pullRequestsLoading: false }));

    set(() => ({ pullRequests: pullRequests.data || [] }));
  },
  pullRequests: [],
  pullRequestsLoading: true,
  clearPullRequest: () =>
    new Promise((resolve) => {
      set(() => ({ selectedPR: "" }));
      resolve();
    }),

  countPRs: null,
  countPRLoading: true,

  pullRequestChart: null,
  pullRequestChartLoading: true,

  fetchPullRequestDetails: async (repository: string) => {
    const pullNumber = get().pullRequests.find(
      (pr) => pr.title === get().selectedPR
    )?.prNumber;
    const pullRequestDetails = await getPullRequestDetails(
      repository,
      pullNumber || 0
    );

    set(() => ({ pullRequestDetails: pullRequestDetails.data }));
    set(() => ({ pullRequestDetailsLoading: false }));
  },
  pullRequestDetails: null,
  pullRequestDetailsLoading: true,

  pullRequestTimeChart: null,
  pullRequestTimeChartLoading: true,
}));
