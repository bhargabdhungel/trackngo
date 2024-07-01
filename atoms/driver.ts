import { Driver } from "@/lib/types";
import { atom } from "recoil";

export const driverIdAtom = atom<number | null>({
  key: "driverIdAtom",
  default: null,
});

export const driversAtom = atom<Driver[] | null>({
  key: "driversAtom",
  default: null
})