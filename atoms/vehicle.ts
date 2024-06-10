import { Vehicle } from "@/lib/types";
import { atom, selector } from "recoil";

export const vehiclesAtom = atom<Vehicle[] | null>({
  key: "vehiclesAtom",
  default: null,
});

export const vehicleOptionsSelector = selector<
  Array<{ value: string; label: string }>
>({
  key: "vehicleOptionsSelector",
  get: ({ get }) => {
    const vehicles = get(vehiclesAtom);
    if (!vehicles) return [];
    return vehicles.map((vehicle) => ({
      value: vehicle.id!.toString(),
      label: vehicle.name,
    }));
  },
});

export const vehicleIdAtom = atom<number | null>({
  key: "vehicleIdAtom",
  default: null,
});

export const vehicleSelector = selector<Vehicle | null>({
  key: "vehicleSelector",
  get: ({ get }) => {
    const vehicleId = get(vehicleIdAtom);
    const vehicles = get(vehiclesAtom);
    if (!vehicleId || !vehicles) return null;
    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
    return vehicle || null;
  },
});
