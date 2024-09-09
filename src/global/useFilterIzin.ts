import { create } from "zustand";

interface State {
  filterIzin: any;
}

interface Actions {
  setFilterIzin: (newState: any) => void;
  clearFilterIzin: () => void;
}

const defaultFilter = {
  tahun: undefined,
  status: undefined,
};

const useFilterIzin = create<State & Actions>((set) => ({
  filterIzin: defaultFilter,
  setFilterIzin: (newState) => set({ filterIzin: newState }),
  clearFilterIzin: () => set({ filterIzin: defaultFilter }),
}));

export default useFilterIzin;
