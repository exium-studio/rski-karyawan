import { create } from "zustand";

interface State {
  dcs: number | undefined;
}

interface Actions {
  setDcs: (newState: State["dcs"]) => void;
}

const useDcs = create<State & Actions>((set) => ({
  dcs: undefined,
  setDcs: (newState) => set({ dcs: newState }),
}));

export default useDcs;
