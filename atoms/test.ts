import { atom } from "recoil";

export const testAtom = atom<string>({
  key: "testAtom",
  default: "test",
});
