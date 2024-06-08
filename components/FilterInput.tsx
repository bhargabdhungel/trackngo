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
import { useEffect, useMemo, useState } from "react";
import { Selector } from "./selector";
import { useRecoilState } from "recoil";
import { vehiclesAtom } from "@/atoms/vehicle";
import useFetchData from "@/hooks/useFetchData";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import { driversAtom } from "@/atoms/driver";
import getAllDrivers from "@/app/actions/driver/getAll";

interface FilterProps {
  startDate: Date;
  endDate: Date;
  vehicleId: number | null;
  driverId: number | null;
  onStartDateChange: (newStartDate: Date) => void;
  onEndDateChange: (newEndDate: Date) => void;
  onVehicleIdChange: (newVehicleId: number | null) => void;
  onDriverIdChange: (newDriverId: number | null) => void;
}

export function FilterInput({
  startDate,
  endDate,
  vehicleId,
  driverId,
  onStartDateChange,
  onEndDateChange,
  onVehicleIdChange,
  onDriverIdChange,
}: FilterProps) {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [localVehicleId, setLocalVehicleId] = useState<string | null>(
    vehicleId ? vehicleId.toString() : null
  );
  const [localDriverId, setLocalDriverId] = useState<string | null>(
    driverId ? driverId.toString() : null
  );
  const [loadingVehicles, setLoadingVehicles] = useState<boolean>(false);
  const [loadingDrivers, setLoadingDrivers] = useState<boolean>(false);
  const [shouldRunVehicles, setShouldRunVehicles] = useState<boolean>(false);
  const [shouldRunDrivers, setShouldRunDrivers] = useState<boolean>(false);

  const [vehicles, setVehicles] = useRecoilState(vehiclesAtom);
  const [drivers, setDrivers] = useRecoilState(driversAtom);
  useFetchData(
    shouldRunVehicles,
    setVehicles,
    getAllVehicles,
    setLoadingVehicles
  );
  useFetchData(shouldRunDrivers, setDrivers, getAllDrivers, setLoadingDrivers);

  useEffect(() => {
    if (vehicles) setShouldRunVehicles(false);
    else setShouldRunVehicles(true);
  }, [vehicles]);

  useEffect(() => {
    if (drivers) setShouldRunDrivers(false);
    else setShouldRunDrivers(true);
  }, [drivers]);

  const vehicleOptions = useMemo(() => {
    if (!vehicles) return [];
    return vehicles.map((vehicle) => ({
      value: vehicle.id?.toString() as string,
      label: vehicle.name,
    }));
  }, [vehicles]);

  const driverOptions = useMemo(() => {
    if (!drivers) return [];
    return drivers!.map((driver) => ({
      value: driver.id?.toString() as string,
      label: driver.name,
    }));
  }, [drivers]);

  const vehileName = useMemo(() => {
    if (!vehicles) return "";
    if (!vehicleId) return "";
    return vehicles.find((vehicle) => vehicle.id === vehicleId)?.name;
  }, [vehicles, vehicleId]);

  const driverName = useMemo(() => {
    if (!drivers) return "";
    if (!driverId) return "";
    return drivers.find((driver) => driver.id === driverId)?.name;
  }, [drivers, driverId]);

  if (loadingVehicles || loadingDrivers) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="ml-1">
          Please add your filters
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>
            Please enter start date and end date.
          </SheetDescription>
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
              placeholder={vehileName ? vehileName : "Select a vehicle"}
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
              placeholder={driverName ? driverName : "Select a driver"}
              setSelected={setLocalDriverId}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              className="w-full"
              onClick={() => {
                onStartDateChange(localStartDate);
                onEndDateChange(localEndDate);
                onVehicleIdChange(
                  localVehicleId ? parseInt(localVehicleId, 10) : null
                );
                onDriverIdChange(
                  localDriverId ? parseInt(localDriverId, 10) : null
                );
              }}
            >
              Filter
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
