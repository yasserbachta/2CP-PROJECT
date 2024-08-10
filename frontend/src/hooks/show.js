import { create } from "zustand";

const useShow = create((set) => ({
  show: "",
  setShow: (id) => set(() => ({ show: id })),
}));

export default useShow;
