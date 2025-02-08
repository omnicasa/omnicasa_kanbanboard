import { create } from "zustand";

interface SiteStore {
  selectedSiteIds: number[];
  setSelectedSiteIds: (ids: number[]) => void;
}

interface ManagerStore {
  selectedManagerIds: number[];
  setSelectedManagerIds: (ids: number[]) => void;
}

interface SortStore {
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

export const useSiteStore = create<SiteStore>((set) => ({
  selectedSiteIds: [],
  setSelectedSiteIds: (ids) => set({ selectedSiteIds: ids }),
}));

export const useManagerStore = create<ManagerStore>((set) => ({
  selectedManagerIds: [],
  setSelectedManagerIds: (ids) => set({ selectedManagerIds: ids }),
}));

export const useSortStore = create<SortStore>((set) => ({
  selectedSort: "",
  setSelectedSort: (sort) => set({ selectedSort: sort }),
}));
