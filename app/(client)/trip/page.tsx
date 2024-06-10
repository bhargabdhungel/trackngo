"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import getAllTrips from "@/app/actions/trip/getAll";
import { useRecoilState } from "recoil";
import { tripsAtom } from "@/atoms/trip";
import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/loading";
import { Trip } from "@/lib/types";
import updateTrips from "@/lib/updateTrips";

export default function GetTrips() {
  const [trips, setTrips] = useRecoilState(tripsAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldRun, setShouldRun] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [updatedTrips, setUpdatedTrips] = useState<Trip[]>([]);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [vehicleId, setVehicleId] = useState<number | null>(null);

  useFetchData(shouldRun, setTrips, getAllTrips, setLoading, {
    startDate,
    endDate,
    driverId,
    vehicleId,
  });

  useEffect(() => {
    setShouldRun(true);
  }, [startDate, endDate, driverId, vehicleId, setTrips]);

  useEffect(() => {
    if (trips) {
      setShouldRun(false);
      setUpdatedTrips(updateTrips(trips));
    } else {
      setShouldRun(true);
    }
  }, [trips]);

  if (loading || !trips) return <Loading />;

  return (
    <div className="flex flex-col justify-center p-4">
      <DataTable columns={columns} data={updatedTrips} />
    </div>
  );
}
