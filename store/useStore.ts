import { create } from "zustand";

interface SiteStore {
  selectedSiteIds: number[];
  setSelectedSiteIds: (ids: number[]) => void;
}

export const useSiteStore = create<SiteStore>((set) => ({
  selectedSiteIds: [],
  setSelectedSiteIds: (ids) => set({ selectedSiteIds: ids }),
}));
