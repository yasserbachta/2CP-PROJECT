import { create } from "zustand";

const useAtchh = create((set) => ({
  atchh: "Cours",
  setatchh: (hello) => set(() => ({ atchh: hello })),
}));

export default useAtchh;
