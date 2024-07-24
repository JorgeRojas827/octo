import { create } from "zustand";
import { ICommitsChart, IRepository } from "../interfaces/repository.interface";
import { getAllRepositories } from "../services/repositories.service";
import { usePullRequestsStore } from "./pull-requests.store";

interface IRepositoriesState {
  selectedRepo: string;
  setSelectedRepo: (repo: string) => void;
  repositories: IRepository[];
  fetchAllRepositories: () => Promise<void>;
  repositoriesLoading: boolean;
  commitChart: ICommitsChart | null;
  commitChartLoading: boolean;
}

export const useRepositoriesStore = create<IRepositoriesState>((set) => ({
  selectedRepo: "",
  setSelectedRepo: (repo) => {
    set(() => ({ selectedRepo: repo }));
    set(() => ({ commitChartLoading: true }));
    usePullRequestsStore.setState((prevState) => ({
      ...prevState,
      countPRLoading: true,
      pullRequestChartLoading: true,
      pullRequestTimeChartLoading: true,
    }));
  },
  repositories: [],
  fetchAllRepositories: async () => {
    const repos = await getAllRepositories();
    set(() => ({ repositoriesLoading: false }));

    set(() => ({ repositories: repos.data }));
  },
  repositoriesLoading: true,
  commitChart: null,
  commitChartLoading: true,
}));
