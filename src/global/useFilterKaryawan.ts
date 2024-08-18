import { create } from "zustand";
import { Interface__FilterKaryawan } from "../constant/interfaces";

interface State {
  filterKaryawan: Interface__FilterKaryawan;
}

interface Actions {
  setFilterKaryawan: (newState: Interface__FilterKaryawan) => void;
  clearFilterKaryawan: () => void;
}

const defaultFilter = {
  jenis_karyawan: undefined,
  status_kerja: undefined,
};

const useFilterKaryawan = create<State & Actions>((set) => ({
  filterKaryawan: defaultFilter,
  setFilterKaryawan: (newState) => set({ filterKaryawan: newState }),
  clearFilterKaryawan: () => set({ filterKaryawan: defaultFilter }),
}));

export default useFilterKaryawan;
