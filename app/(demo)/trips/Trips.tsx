"use client";

import { useMemo } from "react";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import getAllTrips from "@/app/actions/trip/getAll";
import Loading from "@/app/loading";
import updateTrips from "@/lib/updateTrips";
import useData from "@/hooks/useData";
import { useRecoilValue } from "recoil";
import { endDateAtom, startDateAtom } from "@/atoms/trip";
import { vehicleIdAtom } from "@/atoms/vehicle";
import { driverIdAtom } from "@/atoms/driver";

export default function TripsPage() {
  const startDate = useRecoilValue(startDateAtom);
  const endDate = useRecoilValue(endDateAtom);
  const vehicleId = useRecoilValue(vehicleIdAtom);
  const driverId = useRecoilValue(driverIdAtom);
  const { data: trips, isLoading } = useData(getAllTrips, "getAllTrips", {
    startDate,
    endDate,
    vehicleId,
    driverId,
  });

  const updatedTrips = useMemo(() => {
    if (!trips) return [];
    return updateTrips(trips);
  }, [trips]);

  if (isLoading) return <Loading />;
  return (
    <div className="py-8">
      <DataTable columns={columns} data={updatedTrips} />
    </div>
  );
}
