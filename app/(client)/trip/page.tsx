"use client";

import { useState } from "react";
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

function DownloadButton({ trips }: { trips: Trip[] }) {
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(trips);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trips");
    XLSX.writeFile(workbook, "trips.xlsx");
  };

  return <Button onClick={handleDownload}>Download</Button>;
}
export default function GetTrips() {
  const [trips, setTrips] = useRecoilState(tripsAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const shouldRun = trips ? false : true;

  const [startDate, setStaratDate] = useState<Date>(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [page, setPage] = useState<number>(1);

  useFetchData(shouldRun, setTrips, getAllTrips, setLoading, {
    startDate,
    endDate,
    page,
  });

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
        {/* <DownloadButton trips={trips} /> */}
        <DataTable columns={columns} data={updatedTrips} />
      </div>
    </>
  );
}
