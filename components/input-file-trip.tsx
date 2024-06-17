"use client";
import { useRecoilState } from "recoil";
import { Selector } from "./selector";
import { vehiclesAtom } from "@/atoms/vehicle";
import { driversAtom } from "@/atoms/driver";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useFetchData from "@/hooks/useFetchData";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import getAllDrivers from "@/app/actions/driver/getAll";
import Loading from "@/app/loading";
import { Trip } from "@/lib/types";
import addTrip from "@/app/actions/trip/add";
import { toast } from "./ui/use-toast";
import useAuthClient from "@/hooks/useAuthClient";
import { useRouter } from "next/navigation";
import { tripsAtom } from "@/atoms/trip";
import getAllTrips from "@/app/actions/trip/getAll";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./DateInput/DatePicker";
// import { DatePicker } from "./datepicker";

export default function InputTrip() {
  const [vehicles, setVehicles] = useRecoilState(vehiclesAtom);
  const [drivers, setDrivers] = useRecoilState(driversAtom);
  const [trips, setTrips] = useRecoilState(tripsAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const shouldFetchVehicles: boolean = vehicles ? false : true;
  const shouldFetchDrivers: boolean = drivers ? false : true;
  const shouldFetchTrips: boolean = trips ? false : true;
  const router = useRouter();

  useFetchData(shouldFetchVehicles, setVehicles, getAllVehicles, setLoading);
  useFetchData(shouldFetchDrivers, setDrivers, getAllDrivers, setLoading);
  useFetchData(shouldFetchTrips, setTrips, getAllTrips, setLoading, {});

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
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [fare, setFare] = useState<string>("");
  const [maintenance, setMaintenance] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");
  const [otherExpenses, setOtherExpenses] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [vehicleId, setVehicleId] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("");
  const { loading: authLoading, userData } = useAuthClient();

  if (loading || authLoading) return <Loading />;

  return (
    <div className="w-full h-[calc(100vh-112px)] flex justify-center items-center">
      <Card className="w-[350px] sm:w-[700px] lg:w-[800px] my-2">
        <CardHeader>
          <CardTitle>Add a Trip</CardTitle>
          <CardDescription>Add your trip in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4 sm:grid-cols-2">
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="text"
                  placeholder="Start Location"
                  onChange={(e) => setStartLocation(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  type="text"
                  placeholder="End Location"
                  onChange={(e) => setEndLocation(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                {/* <DatePicker
                setDate={(date) => {
                  setStartTime(date!);
                }}
                date={startTime}
              /> */}
                <DatePicker
                  date={startTime}
                  setDate={(date) => setStartTime(date)}
                  placeholder="Start Date"
                />
                {/* <Input
                  type="datetime-local"
                  placeholder="Start Date and Time"
                  onChange={(e) => setStartTime(new Date(e.target.value))}
                /> */}
              </div>

              <div className="flex flex-col space-y-1.5">
                <DatePicker
                  date={endTime}
                  setDate={(date) => setEndTime(date)}
                  placeholder="End Date"
                />
                {/* <Label htmlFor="End Date and Time">End Time</Label>
              <Input
                type="datetime-local"
                placeholder="End Date and Time"
                onChange={(e) => setEndTime(new Date(e.target.value))}
              /> */}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  type="number"
                  placeholder="Fare"
                  onChange={(e) => setFare(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  type="number"
                  placeholder="Maintenance"
                  onChange={(e) => setMaintenance(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  type="number"
                  placeholder="Fuel"
                  onChange={(e) => setFuel(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  type="number"
                  placeholder="Other Expenses"
                  onChange={(e) => setOtherExpenses(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Selector
                  placeholder="Select a vehicle"
                  label="Vehicles"
                  setSelected={(vehicle) => setVehicleId(vehicle)}
                  options={vehicleOptions}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Selector
                  placeholder="Select a driver"
                  label="Drivers"
                  setSelected={(driver) => setDriverId(driver)}
                  options={driverOptions}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  type="text"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={async () => {
              const trip: Trip = {
                userId: userData.userId as number,
                startTime: startTime ? startTime : new Date(),
                endTime: endTime ? endTime : new Date(),
                routeFrom: startLocation,
                routeTo: endLocation,
                fare: parseInt(fare),
                maintenanceCost: parseInt(maintenance),
                fuelCost: parseInt(fuel),
                otherCost: parseInt(otherExpenses),
                description,
                busId: parseInt(vehicleId),
                driverId: parseInt(driverId),
              };
              try {
                setLoading(true);
                const response = await addTrip(trip);
                if (!response.data) throw new Error("Failed to add trip");

                toast({
                  title: response.message,
                  description: response.description,
                });
                setTrips((trips) =>
                  trips ? [...trips, response.data] : [response.data]
                );
              } catch (error) {
                toast({
                  title: "Failed to add trip",
                  description: JSON.stringify(error),
                });
              } finally {
                router.replace("/trips");
                setLoading(false);
              }
            }}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
