import { create } from "zustand";

interface StoreState {
  parent: string | null;
  setParent: (parent: string | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  parent: null,
  setParent: (parent) => set({ parent }),
}));
