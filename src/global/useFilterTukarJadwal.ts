import { create } from "zustand";

interface State {
  filterTukarJadwal: any;
}

interface Actions {
  setFilterTukarJadwal: (newState: any) => void;
  clearFilterTukarJadwal: () => void;
}

const defaultFilter = {
  date_range: undefined,
  kategori_tukar_jadwal: undefined,
  status_penukaran: undefined,
};

const useFilterTukarJadwal = create<State & Actions>((set) => ({
  filterTukarJadwal: defaultFilter,
  setFilterTukarJadwal: (newState) => set({ filterTukarJadwal: newState }),
  clearFilterTukarJadwal: () => set({ filterTukarJadwal: defaultFilter }),
}));

export default useFilterTukarJadwal;
