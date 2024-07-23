import { create } from "zustand";
import { IRepository } from "../interfaces/repository.interface";
import { getAllRepositories } from "../services/repositories.service";

interface IRepositoriesState {
  selectedRepo: string;
  setSelectedRepo: (repo: string) => void;
  repositories: IRepository[];
  fetchAllRepositories: () => Promise<void>;
  repositoriesLoading: boolean;
}

export const useRepositoriesStore = create<IRepositoriesState>((set) => ({
  selectedRepo: "",
  setSelectedRepo: (repo) => set(() => ({ selectedRepo: repo })),
  repositories: [],
  fetchAllRepositories: async () => {
    const repos = await getAllRepositories();
    set(() => ({ repositoriesLoading: false }));

    set(() => ({ repositories: repos.data }));
  },
  repositoriesLoading: true,
}));
