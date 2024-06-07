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
import { FormattedTrip, Trip } from "@/lib/types";
import * as XLSX from "xlsx";
import { DateInput } from "@/components/DateInput/DateInput";
import { format } from "date-fns";

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

function update(trips: Trip[]): Trip[] {
  return trips.map((trip) => ({
    ...trip,
    balance:
      trip.fare! - (trip.maintenanceCost! + trip.fuelCost! + trip.otherCost!),
  }));
}

function formatTrips(trips: Trip[]): FormattedTrip[] {
  return trips.map((trip) => ({
    ...trip,
    startTime: format(trip.startTime, "dd/MM/yy, hh:mm a"),
    endTime: format(trip.endTime, "dd/MM/yy, hh:mm a"),
  }));
}

export default function GetTrips() {
  const [trips, setTrips] = useRecoilState(tripsAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldRun, setShouldRun] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [updatedTrips, setUpdatedTrips] = useState<Trip[]>(update(trips || []));

  const [formattedTrips, setFormattedTrips] = useState<FormattedTrip[]>([]);

  useFetchData(shouldRun, setTrips, getAllTrips, setLoading, {
    startDate,
    endDate,
    driverId: null,
    vehicleId: null,
  });

  useEffect(() => setShouldRun(true), [startDate, endDate]);

  useEffect(() => {
    if (trips) {
      setShouldRun(false);
      const updated = update(trips);
      setUpdatedTrips(updated);
      setFormattedTrips(formatTrips(updated));
    } else {
      setShouldRun(true);
    }
  }, [trips]);

  if (loading || !trips) return <Loading />;

  return (
    <>
      <div className="container mx-auto py-10">
        <DownloadButton trips={updatedTrips} />
        <DateInput
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <DataTable columns={columns} data={formattedTrips} />
      </div>
    </>
  );
}
