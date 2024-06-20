import { atom } from "recoil";

export const driverIdAtom = atom<number | null>({
  key: "driverIdAtom",
  default: null,
});
