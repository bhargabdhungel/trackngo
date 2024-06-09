"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import getAllTrips from "@/app/actions/trip/getAll";
import { useRecoilState } from "recoil";
import { tripsAtom } from "@/atoms/trip";
import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Trip } from "@/lib/types";
import * as XLSX from "xlsx";
import { FilterInput } from "@/components/FilterInput";
import { format, set } from "date-fns";
import { Filter } from "lucide-react";
import updateTrips from "@/lib/updateTrips";

function DownloadButton({ trips }: { trips: Trip[] }) {
  const handleDownload = () => {
    const filteredTrips = trips.map((trip, index) => {
      const newTrip = {
        sl: index + 1,
        startLocation: trip.routeFrom,
        endLocation: trip.routeTo,
        startTime: format(trip.startTime, "dd/MM/yy, hh:mm a"),
        endTime: format(trip.endTime, "dd/MM/yy, hh:mm a"),
        fare: trip.fare,
        maintenance: trip.maintenanceCost,
        fuel: trip.fuelCost,
        other: trip.otherCost,
        balance: trip.balance,
        description: trip.description,
      };
      return newTrip;
    });
    const worksheet = XLSX.utils.json_to_sheet(filteredTrips);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trips");
    XLSX.writeFile(workbook, "trips.xlsx");
  };

  return <Button onClick={handleDownload}>Download</Button>;
}

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
    <div className="container mx-auto py-10">
      <DownloadButton trips={updatedTrips} />

      <FilterInput
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        driverId={driverId}
        vehicleId={vehicleId}
        onDriverIdChange={setDriverId}
        onVehicleIdChange={setVehicleId}
      />

      <DataTable columns={columns} data={updatedTrips} />
    </div>
  );
}
