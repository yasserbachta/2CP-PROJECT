import { create } from "zustand";

const useLoadingP = create((set) => ({
  loading: false,
  setLoading: (val) => {
    set(() => ({ loading: val }));
  },
}));

export default useLoadingP;
