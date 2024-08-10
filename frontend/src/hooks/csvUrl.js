import { create } from "zustand";

const useCsvUrl = create((set) => ({
  CsvUrl: "",
  setCsvUrl: (name) => set(() => ({ CsvUrl: name })),
}));

export default useCsvUrl;
