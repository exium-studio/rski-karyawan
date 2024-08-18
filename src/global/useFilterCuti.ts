import { create } from "zustand";
import { Interface__FilterCuti } from "../constant/interfaces";

interface State {
  filterCuti: Interface__FilterCuti;
}

interface Actions {
  setFilterCuti: (newState: Interface__FilterCuti) => void;
  clearFilterCuti: () => void;
}

const defaultFilter = {
  date_range: undefined,
  jenis_cuti: undefined,
  status_cuti: undefined,
};

const useFilterCuti = create<State & Actions>((set) => ({
  filterCuti: defaultFilter,
  setFilterCuti: (newState) => set({ filterCuti: newState }),
  clearFilterCuti: () => set({ filterCuti: defaultFilter }),
}));

export default useFilterCuti;
