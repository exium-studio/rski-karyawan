import { create } from "zustand";
import { Interface__FilterAktivitas } from "../constant/interfaces";

interface State {
  filterAktivitas: Interface__FilterAktivitas;
}

interface Actions {
  setFilterAktivitas: (newState: Interface__FilterAktivitas) => void;
  clearFilterAktivitas: () => void;
}

const defaultFilter = {
  date_range: undefined,
  jenis_aktivitas: undefined,
};

const useFilterAktivitas = create<State & Actions>((set) => ({
  filterAktivitas: defaultFilter,
  setFilterAktivitas: (newState) => set({ filterAktivitas: newState }),
  clearFilterAktivitas: () => set({ filterAktivitas: defaultFilter }),
}));

export default useFilterAktivitas;
