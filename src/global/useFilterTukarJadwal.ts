import { create } from "zustand";
import { Interface__FilterTukarJadwal } from "../constant/interfaces";

interface State {
  filterTukarJadwal: Interface__FilterTukarJadwal;
}

interface Actions {
  setFilterTukarJadwal: (newState: Interface__FilterTukarJadwal) => void;
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
