import { Driver } from "@/lib/types";
import { atom } from "recoil";
import { selector } from "recoil";

export const driversAtom = atom<Driver[] | null>({
  key: "driversAtom",
  default: null,
});

export const driverOptionsSelector = selector<
  Array<{ value: string; label: string }>
>({
  key: "driverOptionsSelector",
  get: ({ get }) => {
    const drivers = get(driversAtom);
    if (!drivers) return [];
    return drivers.map((driver) => ({
      value: driver.id!.toString(),
      label: driver.name,
    }));
  },
});

export const driverIdAtom = atom<number | null>({
  key: "driverIdAtom",
  default: null,
});

export const driverSelector = selector<Driver | null>({
  key: "driverSelector",
  get: ({ get }) => {
    const driverId = get(driverIdAtom);
    const drivers = get(driversAtom);
    if (!driverId || !drivers) return null;
    const driver = drivers.find((driver) => driver.id === driverId);
    return driver || null;
  },
});
