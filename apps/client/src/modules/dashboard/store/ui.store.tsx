import { create } from "zustand";

interface ILayoutState {
  tab: "metrics" | "reviewer";
}

export const useLayoutStore = create<ILayoutState>((set) => ({
  tab: "metrics",
}));
