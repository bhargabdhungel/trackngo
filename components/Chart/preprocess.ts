import { Trip, TripSummary } from "@/lib/types";

export default function summarizeTrips(trips: Trip[]): TripSummary {
  return trips.reduce<TripSummary>(
    (acc, trip) => {
      const {
        maintenanceCost = 0,
        fuelCost = 0,
        fare = 0,
        otherCost = 0,
        balance = 0,
      } = trip;

      return {
        totalMaintenanceCost: acc.totalMaintenanceCost + (maintenanceCost || 0),
        totalFuelCost: acc.totalFuelCost + (fuelCost || 0),
        totalFare: acc.totalFare + (fare || 0),
        totalOtherCost: acc.totalOtherCost + (otherCost || 0),
        totalBalance: acc.totalBalance + (balance || 0),
        maxMaintenanceCost: Math.max(
          acc.maxMaintenanceCost,
          maintenanceCost || 0
        ),
        maxFuelCost: Math.max(acc.maxFuelCost, fuelCost || 0),
        maxBalance: Math.max(acc.maxBalance, balance || 0),
        maxOtherCost: Math.max(acc.maxOtherCost, otherCost || 0),
      };
    },
    {
      totalMaintenanceCost: 0,
      totalFuelCost: 0,
      totalFare: 0,
      totalOtherCost: 0,
      totalBalance: 0,
      maxMaintenanceCost: 0,
      maxFuelCost: 0,
      maxBalance: 0,
      maxOtherCost: 0,
    }
  );
}
