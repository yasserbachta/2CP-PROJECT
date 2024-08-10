import { create } from "zustand";

const useShowModal = create((set) => ({
    showModal: false,
    setShowModal: (bool) => set(() => ({ showModal: bool })),
}));

export default useShowModal;