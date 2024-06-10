import { Trip } from "@/lib/types";
import { updateTrip } from "@/lib/updateTrips";
import { atom } from "recoil";
import { selector } from "recoil";

export const tripsAtom = atom<Trip[] | null>({
  key: "tripsAtom",
  default: null,
});

export const updatedTripsSelector = selector<Trip[]>({
  key: "updatedTripsSelector",
  get: ({ get }) => {
    const trips = get(tripsAtom);
    return trips ? trips.map(updateTrip) : [];
  },
});

export const tripIdAtom = atom<number | null>({
  key: "tripIdAtom",
  default: null,
});

export const tripSelector = selector<Trip | null>({
  key: "tripSelector",
  get: ({ get }) => {
    const tripId = get(tripIdAtom);
    const trips = get(tripsAtom);
    if (!tripId || !trips) return null;
    const trip = trips.find((trip) => trip.id === tripId);
    return trip || null;
  },
});
