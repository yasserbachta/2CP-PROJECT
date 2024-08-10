import { create } from "zustand";

const useRedirectit = create((set) => ({
  redirectit: true,
  setRedirectit: (val) => set(() => ({ redirectit: val })),
}));

export default useRedirectit;
