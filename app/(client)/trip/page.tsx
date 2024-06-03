"use client";

import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import getAllTrips from "@/app/actions/trip/getAll";
import { useRecoilState } from "recoil";
import { tripsAtom } from "@/atoms/trip";
import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/loading";
import { Trip } from "@/lib/types";

export default function GetTrips() {
  const [trips, setTrips] = useRecoilState(tripsAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const shouldRun = trips ? false : true;
  useFetchData(shouldRun, setTrips, getAllTrips, setLoading);
  if (loading || !trips) return <Loading />;

  function calculateBalance(trips: Trip[]): Trip[] {
    return trips.map(trip => ({
      ...trip,
      balance: trip.fare! - (trip.maintenanceCost! + trip.fuelCost! + trip.otherCost!),
    }));
  }

  const updatedTrips: Trip[] = trips ? calculateBalance(trips) : [];

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={updatedTrips} />
      </div>
    </>
  );
}
