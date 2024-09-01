import { create } from "zustand";

interface State {
  statusAktif: number | undefined;
  dcs: number | undefined;
  jenisKaryawan: number | undefined;
}

interface Actions {
  setStatusAktif: (newState: State["statusAktif"]) => void;
  setDcs: (newState: State["dcs"]) => void;
  setJenisKaryawan: (newState: State["dcs"]) => void;
}

const useAuth = create<State & Actions>((set) => ({
  statusAktif: 0,
  setStatusAktif: (newState) => set({ statusAktif: newState }),

  dcs: undefined,
  setDcs: (newState) => set({ dcs: newState }),

  jenisKaryawan: undefined,
  setJenisKaryawan: (newState) => set({ jenisKaryawan: newState }),
}));

export default useAuth;
