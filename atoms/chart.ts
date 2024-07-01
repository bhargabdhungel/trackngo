import { atom } from "recoil";
import { ChartType } from "@/lib/types";

export const chartAtom = atom<ChartType>({
  key: "chartAtom",
  default: ChartType.Race,
});
