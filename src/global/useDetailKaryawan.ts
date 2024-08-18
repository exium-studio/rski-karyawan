import { create } from "zustand";

interface State {
  detailKaryawanId: number | undefined;
}

interface Actions {
  setDetailKaryawanId: (newState: State["detailKaryawanId"]) => void;
}

const useDetailKaryawan = create<State & Actions>((set) => ({
  detailKaryawanId: undefined,
  setDetailKaryawanId: (newState) => set({ detailKaryawanId: newState }),
}));

export default useDetailKaryawan;
