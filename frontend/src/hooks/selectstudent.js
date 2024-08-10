import { create } from "zustand";

const useSelect = create((set) => ({
    selectedStudent : [],
    setSelectedStudent: (array) => set(() => ({ selectedStudent: array })),
    uncheckedStudent: (id) => set((state) => ({ selectedStudent: state.selectedStudent.filter((student) => student !== id) })),
}));

export default useSelect;