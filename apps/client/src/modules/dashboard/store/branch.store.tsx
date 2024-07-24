import { create } from "zustand";
import { getAllBranches } from "../services/branches.service";
import { IBranch } from "../interfaces/branch.interface";
import { usePullRequestsStore } from "./pull-requests.store";
import { useRepositoriesStore } from "./repository.store";

interface IBranchesState {
  selectedBranch: string;
  selectedBranchObject: IBranch;
  setSelectedBranch: (branch: string) => void;
  branches: IBranch[];
  fetchAllBranches: (repository: string) => Promise<void>;
  clearSelectedBranch: () => Promise<void>;
  branchesLoading: boolean;
}

export const useBranchesStore = create<IBranchesState>((set, get) => ({
  branches: [],
  setSelectedBranch: (branch) => {
    set(() => ({ selectedBranch: branch }));
    set(() => ({
      selectedBranchObject: get().branches.find((b) => b.name === branch),
    }));
  },
  branchesLoading: true,
  selectedBranchObject: {} as IBranch,
  selectedBranch: "",
  fetchAllBranches: async (repository: string) => {
    const response = await getAllBranches(repository);
    set(() => ({ branchesLoading: false }));

    usePullRequestsStore.setState((prevState) => ({
      ...prevState,
      countPRs: {
        closedPRs: response.data.closedPRs,
        mergedPRs: response.data.mergedPRs,
        openPRs: response.data.openPRs,
        totalPRs: response.data.totalPRs,
      },
      pullRequestChart: response.data.prChart,
      pullRequestTimeChart: response.data.timeChart,
    }));
    usePullRequestsStore.setState((prevState) => ({
      ...prevState,
      countPRLoading: false,
      pullRequestChartLoading: false,
      pullRequestTimeChartLoading: false,
    }));

    useRepositoriesStore.setState((prevState) => ({
      ...prevState,
      commitChart: response.data.commitChart,
      commitChartLoading: false,
    }));

    set(() => ({ branches: response.data.branches }));
  },
  clearSelectedBranch: () =>
    new Promise((resolve) => {
      set(() => ({ selectedBranch: "" }));
      set(() => ({ selectedBranchObject: {} as IBranch }));
      resolve();
    }),
}));
