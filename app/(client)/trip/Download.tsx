"use client";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { useRecoilValue } from "recoil";
import { updatedTripsSelector } from "@/atoms/trip";
export default function DownloadButton() {
  const trips = useRecoilValue(updatedTripsSelector);
  const handleDownload = () => {
    const filteredTrips = trips.map((trip, index) => {
      const newTrip = {
        sl: index + 1,
        startLocation: trip.routeFrom,
        endLocation: trip.routeTo,
        startTime: trip.startTime,
        endTime: trip.endTime,
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
    const fileNameRandomId = Math.random().toString(36).substring(2, 15);
    const fileName = `trips-${fileNameRandomId}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };
  return <Button onClick={handleDownload}>Download</Button>;
}
