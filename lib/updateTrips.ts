import { format } from "date-fns";
import { Trip } from "@/lib/types";

export function updateTrip(trip: Trip): Trip {
  if (!trip) return trip;
  return {
    ...trip,
    balance:
      trip.fare! - (trip.maintenanceCost! + trip.fuelCost! + trip.otherCost!),
    startTime: format(trip.startTime, "dd/MM/yy, hh:mm a"),
    endTime: format(trip.endTime, "dd/MM/yy, hh:mm a"),
    fare: trip.fare ? trip.fare : 0,
    maintenanceCost: trip.maintenanceCost ? trip.maintenanceCost : 0,
    fuelCost: trip.fuelCost ? trip.fuelCost : 0,
    otherCost: trip.otherCost ? trip.otherCost : 0,
    description: trip.description ? trip.description : "No description",
  };
}

export default function updateTrips(trips: Trip[]): Trip[] {
  return trips.map((trip) => updateTrip(trip) || []);
}
