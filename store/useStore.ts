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

interface MailItem {
  id: number;
  clicked: boolean;
}

interface MailStore {
  selectedMailItem: MailItem;
  setSelectedMailItem: (item: MailItem) => void;
}

interface SendMessageItem {
  message: string;
  type: string;
  state: boolean;
}
interface sendMessageStore {
  sendMessageItem: SendMessageItem;
  setSendMessageItem: (item: SendMessageItem) => void;
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

export const useMailStore = create<MailStore>((set) => ({
  selectedMailItem: { id: 0, clicked: false },
  setSelectedMailItem: (item) => set({ selectedMailItem: item }),
}));

export const useSendMessageStore = create<sendMessageStore>((set) => ({
  sendMessageItem: { message: "", type: "", state: false },
  setSendMessageItem: (item) => set({ sendMessageItem: item }),
}));
