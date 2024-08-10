import { create } from "zustand";

const useLoadingT = create((set) => ({
  loading: true,
  setLoading: (val) => set(() => ({ loading: val })),
}));

export default useLoadingT;
