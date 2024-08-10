import { create } from "zustand";

const useSelectedEvent = create((set) => ({
  selectedId: "",
  setSelectedId: (id) => set(() => ({ selectedId: id })),
}));

export default useSelectedEvent;
