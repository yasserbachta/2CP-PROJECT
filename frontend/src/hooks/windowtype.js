import { create } from "zustand";

const useType = create((set) => ({
  type: '',
  setType: (type) => set(() => ({ type: type })),
}));

export default useType;