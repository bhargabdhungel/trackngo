"use client";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { useRecoilValue } from "recoil";
import useData from "@/hooks/useData";
import getAllTrips from "@/app/actions/trip/getAll";
import { endDateAtom, startDateAtom } from "@/atoms/trip";
import { vehicleIdAtom } from "@/atoms/vehicle";
import { driverIdAtom } from "@/atoms/driver";
import { useMemo } from "react";
import updateTrips from "@/lib/updateTrips";
import {
  TooltipContent,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowDownToLine } from "lucide-react";
import Loading from "@/app/loading";
import { Toggle } from "@radix-ui/react-toggle";
export default function DownloadButton({
  showIcon = false,
}: {
  showIcon?: boolean;
}) {
  const endDate = useRecoilValue(endDateAtom);
  const startDate = useRecoilValue(startDateAtom);
  const driverId = useRecoilValue(driverIdAtom);
  const vehicleId = useRecoilValue(vehicleIdAtom);
  const { data: trips, isLoading } = useData(getAllTrips, "getAllTrips", {
    startDate,
    endDate,
    vehicleId,
    driverId,
  });

  const filteredTrips = useMemo(() => {
    if (!trips) return [];
    return updateTrips(trips);
  }, [trips]);

  const handleDownload = () => {
    const downloadTrips = filteredTrips!.map((trip, index) => {
      const newTrip = {
        ...trip,
        sl: index + 1,
      };
      return newTrip;
    });
    const worksheet = XLSX.utils.json_to_sheet(downloadTrips);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trips");
    const fileNameRandomId = Math.random().toString(36).substring(2, 15);
    const fileName = `trips-${fileNameRandomId}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  if (isLoading) return null;

  if (showIcon)
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle onClick={handleDownload}>
              <ArrowDownToLine className="w-5 rounded-full" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent side="bottom">Download</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

  return (
    <Button onClick={handleDownload} className="w-24">
      Download
    </Button>
  );
}
