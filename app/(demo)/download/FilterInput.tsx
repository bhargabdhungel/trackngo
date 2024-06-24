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
import { DatePicker } from "@/components/DateInput/DatePicker";
import { useMemo, useState } from "react";
import { Selector } from "../../../components/selector";
import { useRecoilState } from "recoil";
import { vehicleIdAtom } from "@/atoms/vehicle";
import { driverIdAtom } from "@/atoms/driver";
import { endDateAtom, startDateAtom } from "@/atoms/trip";
import useData from "@/hooks/useData";
import getAllDrivers from "@/app/actions/driver/getAll";
import getAllVehicles from "@/app/actions/vehicle/getAll";

export default function FilterInput() {
  const date: Date = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
  const [localStartDate, setLocalStartDate] = useState<Date | null>(date);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(new Date());
  const [localVehicleId, setLocalVehicleId] = useState<string | null>(null);
  const [localDriverId, setLocalDriverId] = useState<string | null>(null);
  const [vehicleId, setVehicleId] = useRecoilState(vehicleIdAtom);
  const [driverId, setDriverId] = useRecoilState(driverIdAtom);
  const [startDate, setStartDate] = useRecoilState(startDateAtom);
  const [endDate, setEndDate] = useRecoilState(endDateAtom);
  const [open, setOpen] = useState<boolean>(false);

  const { data: drivers, isLoading: loadingDrivers } = useData(
    getAllDrivers,
    "getAllDrivers"
  );

  const { data: vehicles, isLoading: loadingVehicles } = useData(
    getAllVehicles,
    "getAllVehicles"
  );

  const driverOptions = useMemo(() => {
    if (loadingDrivers) return [];
    return drivers!.map((driver) => ({
      value: driver.id!.toString(),
      label: driver.name,
    }));
  }, [drivers, loadingDrivers]);

  const vehicleOptions = useMemo(() => {
    if (loadingVehicles) return [];
    return vehicles!.map((vehicle) => ({
      value: vehicle.id!.toString(),
      label: vehicle.name,
    }));
  }, [vehicles, loadingVehicles]);

  const vehicle = useMemo(() => {
    if (localVehicleId && vehicles)
      return vehicles.find((v) => v.id!.toString() === localVehicleId);
    return null;
  }, [localVehicleId, vehicles]);

  const driver = useMemo(() => {
    if (localDriverId && drivers)
      return drivers.find((d) => d.id!.toString() === localDriverId);
    return null;
  }, [localDriverId, drivers]);

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => setOpen(true)}
        >
          Filter
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
              placeholder={vehicle ? vehicle.name : "Select a vehicle"}
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
              placeholder={driver ? driver.name : "Select a driver"}
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
                  setStartDate(localStartDate!);
                  setEndDate(localEndDate!);
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
