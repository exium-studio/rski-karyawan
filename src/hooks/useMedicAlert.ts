import { create } from "zustand";

interface Props {
  isOpen: boolean;
  setIsOpen: (newState: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  data: any;
  setData: (newState: any) => void;
}

const useMedicAlert = create<Props>((set) => {
  return {
    isOpen: false,
    setIsOpen: (newState) => set({ isOpen: newState }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    data: null,
    setData: (newState) => set({ data: newState }),
  };
});

export default useMedicAlert;
