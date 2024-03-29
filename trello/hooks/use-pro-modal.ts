import { create } from "zustand";

type CardProStore = {

    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useProModal = create<CardProStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));