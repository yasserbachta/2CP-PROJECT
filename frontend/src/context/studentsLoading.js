import { create } from "zustand";

const useLoadingS = create((set) => ({
  loading: true,
  setLoading: (val) => set(() => ({ loading: val })),
}));

export default useLoadingS;
