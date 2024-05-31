"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { Selector } from "./selector";
import { vehiclesAtom } from "@/atoms/vehicle";
import { driversAtom } from "@/atoms/driver";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useFetchData from "@/hooks/useFetchData";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import getAllDrivers from "@/app/actions/driver/getAll";
import Loading from "./loading";

export default function InputTrip() {
  const [vehicles, setVehicles] = useRecoilState(vehiclesAtom);
  const [drivers, setDrivers] = useRecoilState(driversAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const shouldFetchVehicles: boolean = vehicles ? false : true;
  const shouldFetchDrivers: boolean = drivers ? false : true;
  useFetchData(shouldFetchVehicles, setVehicles, getAllVehicles, setLoading);
  useFetchData(shouldFetchDrivers, setDrivers, getAllDrivers, setLoading);

  const driverOptions =
    drivers?.map((driver) => ({
      label: driver.name,
      value: driver.id!.toString(),
    })) ?? [];

  const vehicleOptions =
    vehicles?.map((vehicle) => ({
      label: vehicle.name,
      value: vehicle.id!.toString(),
    })) ?? [];

  const [startLocation, setStartLocation] = useState<string>("");
  const [endLocation, setEndLocation] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [fare, setFare] = useState<string>("");
  const [maintenance, setMaintenance] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");
  const [otherExpenses, setOtherExpenses] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [vehicleId, setVehicleId] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("");

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center w-5/6 gap-8 md:w-1/2 * pt-8 pb-8">
      <Selector
        placeholder="Select a vehicle"
        label="Vehicles"
        setSelected={(vehicle) => setVehicleId(vehicle)}
        options={vehicleOptions}
      />
      <Selector
        placeholder="Select a driver"
        label="Drivers"
        setSelected={(driver) => setDriverId(driver)}
        options={driverOptions}
      />
      <Input
        type="datetime-local"
        placeholder="Start Date and Time"
        onChange={(e) => setStartTime(e.target.value)}
      />
      <Input
        type="datetime-local"
        placeholder="End Date and Time"
        onChange={(e) => setEndTime(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Start Location"
        onChange={(e) => setStartLocation(e.target.value)}
      />
      <Input
        type="text"
        placeholder="End Location"
        onChange={(e) => setEndLocation(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Fare"
        onChange={(e) => setFare(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Maintenance"
        onChange={(e) => setMaintenance(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Fuel"
        onChange={(e) => setFuel(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Other Expenses"
        onChange={(e) => setOtherExpenses(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        onClick={() => {
          console.log({
            startLocation,
            endLocation,
            startTime,
            endTime,
            fare,
            maintenance,
            fuel,
            otherExpenses,
            description,
            vehicleId,
            driverId,
          });
        }}
      >
        Submit
      </Button>
    </div>
  );
}
