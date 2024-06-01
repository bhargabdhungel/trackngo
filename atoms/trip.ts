import { Trip } from "@/lib/types";
import { atom } from "recoil";

export const tripsAtom = atom<Trip[] | null>({
  key: "tripsAtom",
  default: null,
});
