import { Vehicle } from "@/lib/types";
import { atom } from "recoil";

export const vehiclesAtom = atom<Vehicle[] | null>({
  key: "vehiclesAtom",
  default: null,
});
