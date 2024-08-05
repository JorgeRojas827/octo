import { create } from "zustand";
import {
  getAllPullRequests,
  getPullRequestDetails,
  submitPullRequestReview,
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
import { useBranchesStore } from "./branch.store";

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

  submitPullRequestLoading: boolean;
  submitPullRequestSuccess: boolean;
  submitPullRequestReview: (
    review: string,
    filename: string,
    changes: string
  ) => Promise<void>;
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

  submitPullRequestLoading: false,
  submitPullRequestSuccess: false,
  submitPullRequestReview: async (
    review: string,
    filename: string,
    changes
  ) => {
    set(() => ({ submitPullRequestSuccess: false }));
    set(() => ({ submitPullRequestLoading: true }));
    const line = Number(changes.match(/\d+/g)?.[0]) || 1;

    await submitPullRequestReview(
      useRepositoriesStore.getState().selectedRepo,
      get().selectedNumberPR,
      review,
      filename,
      useBranchesStore.getState().selectedBranchObject.commitSha,
      line
    );
    set(() => ({ submitPullRequestLoading: false }));
    set(() => ({ submitPullRequestSuccess: true }));
    set(() => ({ submitPullRequestSuccess: false }));
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
