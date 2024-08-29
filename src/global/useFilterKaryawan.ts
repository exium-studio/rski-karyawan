import { create } from "zustand";

interface State {
  filterKaryawan: any;
}

interface Actions {
  setFilterKaryawan: (newState: any) => void;
  clearFilterKaryawan: () => void;
}

const defaultFilter = {
  status: undefined,
};

const useFilterKaryawan = create<State & Actions>((set) => ({
  filterKaryawan: defaultFilter,
  setFilterKaryawan: (newState) => set({ filterKaryawan: newState }),
  clearFilterKaryawan: () => set({ filterKaryawan: defaultFilter }),
}));

export default useFilterKaryawan;
