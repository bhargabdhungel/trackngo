import { atom } from "recoil";

export const vehicleIdAtom = atom<number | null>({
  key: "vehicleIdAtom",
  default: null,
});
