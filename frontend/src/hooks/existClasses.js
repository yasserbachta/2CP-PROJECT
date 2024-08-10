import { create } from "zustand";

const useExistClasses = create((set) => ({
  existClasses: [],
  setExistClasses: (id) => set(() => ({ ExistClasses: id })),
}));

export default useExistClasses;
