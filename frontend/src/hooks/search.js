import { create } from "zustand";

const useSearch = create((set) => ({
  search: '',
  setSearch: (name) => set(() => ({ search: name })),
}));

export default useSearch;