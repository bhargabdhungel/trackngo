"use client";
import { tripsAtom } from "@/atoms/trip";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function TripDetails() {
  const trips = useRecoilValue(tripsAtom);
  const router = useRouter();
  const tripId = parseInt(usePathname().split("/").pop() as string, 10);

  useEffect(() => {
    if (!trips) router.replace("/trip");
  }, [trips, router]);

  const trip = trips?.find((trip) => trip.id === tripId);
  if (!trip) return <div>Trip not found</div>;

  return (
    <div className="h-full flex flex-col pt-12 items-center">
      <h2 className="scroll-m-20 border-b pb-12 text-3xl font-semibold tracking-tight first:mt-0">
        {trip.routeFrom} - {trip.routeTo}
      </h2>
      <div className="flex flex-col items-center">
        <h1>Start Time: convert date to string</h1>
        <h1>End Time: convert date to string</h1>
        <h1>Fare: {trip.fare}</h1>
        <h1>Maintenance: {trip.maintenanceCost}</h1>
        <h1>Fuel: {trip.fuelCost}</h1>
        <h1>Other Expenses: {trip.otherCost}</h1>
        <h1>Balance: calculate balance based on the above costs</h1>
      </div>
    </div>
  );
}
