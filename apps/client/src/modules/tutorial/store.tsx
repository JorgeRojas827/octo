import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type StageShown =
  | "repositoryShown"
  | "metricsShown"
  | "branchAndPRShown"
  | "detailsShown";

interface ITutorialStore {
  repositoryShown: boolean;
  metricsShown: boolean;
  branchAndPRShown: boolean;
  detailsShown: boolean;
  _hasHydrated: boolean;
  changeShown: (stageShown: StageShown) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useTutorialStore = create(
  persist<ITutorialStore>(
    (set) => ({
      repositoryShown: false,
      metricsShown: false,
      branchAndPRShown: false,
      detailsShown: false,
      _hasHydrated: false,
      changeShown: (stageShown: StageShown) => {
        set((state) => ({ ...state, [stageShown]: true }));
      },
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: "tutorial-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (stage) => {
        return (state, error) => {
          if (error) {
            console.log("An error occurred while rehydrating the store", error);
          } else {
            state!.setHasHydrated(true);
          }
        };
      },
    }
  )
);
