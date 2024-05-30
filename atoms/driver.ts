import { Driver } from "@/lib/types";
import { atom } from "recoil";

export const driversAtom = atom<Driver[] | null>({
  key: "driversAtom",
  default: null,
});
