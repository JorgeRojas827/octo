import { create } from "zustand";
import { IAIReview } from "../interfaces/ai.interface";
import getAIReview from "../services/ai.service";

interface IAIStore {
  aiReviews: IAIReview[] | null;
  aiLoading: boolean;
  fetchAIReview: (repository: string, pullNumber: string) => Promise<void>;
  clearAIReview: () => void;
}

export const useAIStore = create<IAIStore>((set) => ({
  aiReviews: null,
  aiLoading: false,
  fetchAIReview: async (repository: string, pullNumber: string) => {
    set({ aiLoading: true });
    const response = await getAIReview(repository, pullNumber);
    set({ aiReviews: response.data, aiLoading: false });
  },
  clearAIReview: () => {
    set({ aiReviews: null });
  },
}));
