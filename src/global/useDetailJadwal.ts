import { create } from "zustand";

interface State {
  detailJadwalIndex: number;
}

interface Actions {
  setDetailJadwalIndex: (newState: State["detailJadwalIndex"]) => void;
}

const useDetailJadwal = create<State & Actions>((set) => ({
  detailJadwalIndex: 0,
  setDetailJadwalIndex: (newState) => set({ detailJadwalIndex: newState }),
}));

export default useDetailJadwal;
