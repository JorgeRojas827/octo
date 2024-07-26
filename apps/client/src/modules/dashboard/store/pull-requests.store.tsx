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
import { useAIStore } from "./ai.store";

interface IPullRequestsState {
  selectedPR: string;
  selectedNumberPR: string;
  setSelectedNumberPR: (number: string) => void;
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
  selectedNumberPR: "",
  pullRequests: [],
  pullRequestsLoading: true,
  countPRLoading: true,
  countPRs: null,
  setSelectedPR: (pr) => {
    set(() => ({ selectedPR: pr }));
    set(() => ({ pullRequestDetailsLoading: true }));
    get().fetchPullRequestDetails(useRepositoriesStore.getState().selectedRepo);
    useAIStore.setState({ aiReviews: null });
  },
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
