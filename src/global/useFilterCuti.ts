import { create } from "zustand";

interface State {
  filterCuti: any;
}

interface Actions {
  setFilterCuti: (newState: any) => void;
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
