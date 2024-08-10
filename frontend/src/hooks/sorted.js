import { create } from "zustand";

const useSort = create((set) => ({
  sorted: false,
  toggle: () => set((state) => ({ sorted: !state.sorted })),
}));

export default useSort;