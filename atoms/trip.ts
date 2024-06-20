import { atom } from "recoil";

export const startDateAtom = atom<Date>({
  key: "startDateAtom",
  default: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
});

export const endDateAtom = atom<Date>({
  key: "endDateAtom",
  default: new Date(),
});
