"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DatePicker } from "./DateInput/DatePicker";
import { useEffect, useState } from "react";
import { Selector } from "./selector";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  vehicleIdAtom,
  vehicleOptionsSelector,
  vehicleSelector,
  vehiclesAtom,
} from "@/atoms/vehicle";
import useFetchData from "@/hooks/useFetchData";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import {
  driverIdAtom,
  driverOptionsSelector,
  driverSelector,
  driversAtom,
} from "@/atoms/driver";
import getAllDrivers from "@/app/actions/driver/getAll";
import { tripsAtom } from "@/atoms/trip";
import getAllTrips from "@/app/actions/trip/getAll";

export default function FilterInput() {
  const date: Date = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
  const [localStartDate, setLocalStartDate] = useState<Date | null>(date);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(new Date());
  const [localVehicleId, setLocalVehicleId] = useState<string | null>(null);
  const [localDriverId, setLocalDriverId] = useState<string | null>(null);
  const [vehicleId, setVehicleId] = useRecoilState(vehicleIdAtom);
  const [driverId, setDriverId] = useRecoilState(driverIdAtom);
  const [startDate, setStartDate] = useState(localStartDate ?? date);
  const [endDate, setEndDate] = useState(localEndDate ?? new Date());

  const [loadingVehicles, setLoadingVehicles] = useState<boolean>(false);
  const [loadingDrivers, setLoadingDrivers] = useState<boolean>(false);
  const [loadingTrips, setLoadingTrips] = useState<boolean>(false);

  const [shouldRunVehicles, setShouldRunVehicles] = useState<boolean>(false);
  const [shouldRunDrivers, setShouldRunDrivers] = useState<boolean>(false);
  const [shouldRunTrips, setShouldRunTrips] = useState<boolean>(false);

  const [vehicles, setVehicles] = useRecoilState(vehiclesAtom);
  const [drivers, setDrivers] = useRecoilState(driversAtom);
  const [trips, setTrips] = useRecoilState(tripsAtom);

  const vehicleOptions = useRecoilValue(vehicleOptionsSelector);
  const driverOptions = useRecoilValue(driverOptionsSelector);

  const vehicle = useRecoilValue(vehicleSelector);
  const driver = useRecoilValue(driverSelector);

  const [open, setOpen] = useState<boolean>(false);

  useFetchData(
    shouldRunVehicles,
    setVehicles,
    getAllVehicles,
    setLoadingVehicles
  );
  useFetchData(shouldRunDrivers, setDrivers, getAllDrivers, setLoadingDrivers);
  useFetchData(shouldRunTrips, setTrips, getAllTrips, setLoadingTrips, {
    startDate,
    endDate,
    vehicleId,
    driverId,
  });

  useEffect(() => {
    if (vehicles) setShouldRunVehicles(false);
    else setShouldRunVehicles(true);
  }, [vehicles]);

  useEffect(() => {
    if (drivers) setShouldRunDrivers(false);
    else setShouldRunDrivers(true);
  }, [drivers]);

  useEffect(() => {
    if (trips) setShouldRunTrips(false);
    else setShouldRunTrips(true);
  }, [trips]);

  if (loadingVehicles || loadingDrivers) return null;

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => setOpen(true)}
        >
          {loadingTrips ? "Filtering trips..." : "Filter"}
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>Please add your filters</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="start-date" className="w-1/3 text-left">
              Start Date
            </Label>
            <DatePicker date={localStartDate} setDate={setLocalStartDate} />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="end-date" className="w-1/3 text-left">
              End Date
            </Label>
            <DatePicker date={localEndDate} setDate={setLocalEndDate} />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="vehicle-id" className="w-1/3 text-left">
              Vehicle
            </Label>
            <Selector
              options={vehicleOptions}
              label="Vehicle"
              placeholder={
                vehicle && vehicleId ? vehicle.name : "Select a vehicle"
              }
              setSelected={setLocalVehicleId}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="driver-id" className="w-1/3 text-left">
              Driver
            </Label>
            <Selector
              options={driverOptions}
              label="Driver"
              placeholder={driver && driverId ? driver.name : "Select a driver"}
              setSelected={setLocalDriverId}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setLocalStartDate(date);
                  setStartDate(date);
                  setLocalEndDate(new Date());
                  setEndDate(new Date());
                  setLocalDriverId(null);
                  setVehicleId(null);
                  setLocalVehicleId(null);
                  setDriverId(null);
                  setShouldRunTrips(true);
                  setOpen(false);
                }}
              >
                Reset
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  if (localVehicleId)
                    setVehicleId(parseInt(localVehicleId as string, 10));
                  if (localDriverId)
                    setDriverId(parseInt(localDriverId as string, 10));

                  setShouldRunTrips(true);
                  setOpen(false);
                }}
              >
                Apply
              </Button>
            </>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
