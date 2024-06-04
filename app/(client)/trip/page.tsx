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
import { DateInput } from "@/components/DateInput/DateInput";

function formatDate(date: Date) {
  // Extract parts of the date
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? "pm" : "am";

  // Format hours for 12-hour format
  const formattedHour = hours % 12 || 12; // Convert 0 to 12 for 12-hour time
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Ensure two digits for minutes

  // Construct the formatted date string
  return `${formattedHour}.${formattedMinutes}${ampm} ${month} ${day} ${year}`;
}

function DownloadButton({ trips }: { trips: Trip[] }) {
  const handleDownload = () => {
    // Define the keys you want to include in the Excel file
    const keysToInclude = ["id", "destination", "fare", "balance"]; // Adjust this list as needed

    // Map through the trips and pick only the keys you want
    const filteredTrips = trips.map((trip, index) => {
      const newTrip = {
        sl: index + 1,
        startLocation: trip.routeFrom,
        endLocation: trip.routeTo,
        startTime: formatDate(trip.startTime),
        endTime: formatDate(trip.endTime),
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

export default function GetTrips() {
  const [trips, setTrips] = useRecoilState(tripsAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const shouldRun = trips ? false : true;
  const [startDate, setStartDate] = useState<Date>(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [page, setPage] = useState<number>(1);
  const [updatedTrips, setUpdatedTrips] = useState<Trip[]>(update(trips || []));

  useFetchData(shouldRun, setTrips, getAllTrips, setLoading, {
    startDate,
    endDate,
    page,
  });

  useEffect(() => {
    setUpdatedTrips(update(trips || []));
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
        <DataTable columns={columns} data={updatedTrips} />
      </div>
    </>
  );
}
