import { create } from "zustand";
import { getAllBranches } from "../services/branches.service";
import { IBranch } from "../interfaces/branch.interface";

interface IBranchesState {
  selectedBranch: string;
  selectedBranchObject: IBranch;
  setSelectedBranch: (branch: string) => void;
  branches: IBranch[];
  fetchAllBranches: (repository: string) => Promise<void>;
  clearSelectedBranch: () => Promise<void>;
}

export const useBranchesStore = create<IBranchesState>((set, get) => ({
  branches: [],
  setSelectedBranch: (branch) => {
    set(() => ({ selectedBranch: branch }));
    set(() => ({
      selectedBranchObject: get().branches.find((b) => b.name === branch),
    }));
  },
  selectedBranchObject: {} as IBranch,
  selectedBranch: "",
  fetchAllBranches: async (repository: string) => {
    const branches = await getAllBranches(repository);

    set(() => ({ branches: branches.data }));
  },
  clearSelectedBranch: () =>
    new Promise((resolve) => {
      set(() => ({ selectedBranch: "" }));
      set(() => ({ selectedBranchObject: {} as IBranch }));
      resolve();
    }),
}));
