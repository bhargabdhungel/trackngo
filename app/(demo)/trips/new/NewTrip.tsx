"use client";
import { Selector } from "@/components/selector";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import getAllDrivers from "@/app/actions/driver/getAll";
import Loading from "@/app/loading";
import { Trip } from "@/lib/types";
import addTrip from "@/app/actions/trip/add";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import getAllTrips from "@/app/actions/trip/getAll";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/DateInput/DatePicker";
import useData from "@/hooks/useData";
import useAuthClient from "@/hooks/useAuthClient";
import { useRecoilValue } from "recoil";
import { endDateAtom, startDateAtom } from "@/atoms/trip";
import { vehicleIdAtom } from "@/atoms/vehicle";
import { driverIdAtom } from "@/atoms/driver";

function shouldUpdate({
  startDate,
  endDate,
  vehicleId,
  driverId,
  Trip,
}: {
  startDate: Date;
  endDate: Date;
  vehicleId: number | null;
  driverId: number | null;
  Trip: Trip;
}) {
  return (
    startDate <= Trip.startTime &&
    Trip.startTime <= endDate &&
    (vehicleId === null || vehicleId === Trip.busId) &&
    (driverId === null || driverId === Trip.driverId)
  );
}

export default function NewTrip() {
  const router = useRouter();
  const startDate = useRecoilValue(startDateAtom);
  const endDate = useRecoilValue(endDateAtom);
  const vehicleIdMain = useRecoilValue(vehicleIdAtom);
  const driverIdMain = useRecoilValue(driverIdAtom);

  const { data: vehicles, isLoading: isVehiclesLoading } = useData(
    getAllVehicles,
    "getAllVehicles"
  );
  const { data: drivers, isLoading: isDriversLoading } = useData(
    getAllDrivers,
    "getAllDrivers"
  );
  const {
    data: trips,
    isLoading: isTripsLoading,
    mutate,
  } = useData(getAllTrips, "getAllTrips", {
    startDate,
    endDate,
  });
  const { loading: authLoading, userData } = useAuthClient();

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (
    isDriversLoading ||
    isVehiclesLoading ||
    isTripsLoading ||
    isLoading ||
    authLoading
  )
    return <Loading />;

  return (
    <div className="w-full h-[calc(100vh-112px)] flex justify-center items-center py-2">
      <Card className="w-full md:w-1/2">
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
                <DatePicker
                  date={startTime}
                  setDate={(date) => setStartTime(date)}
                  placeholder="Start Date"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <DatePicker
                  date={endTime}
                  setDate={(date) => setEndTime(date)}
                  placeholder="End Date"
                />
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
              if (!startTime) {
                toast({
                  title: "Please select a start time",
                });
                return;
              }
              if (!startLocation) {
                toast({
                  title: "Please select a start location",
                });
                return;
              }
              if (endLocation) {
                if (!endTime) {
                  toast({
                    title: "Please select an end time",
                  });
                  return;
                }
              }
              if (!endTime) {
                toast({
                  title: "Please select an end time",
                });
                return;
              }
              const trip: Trip = {
                userId: userData.userId!,
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
                setIsLoading(true);
                const response = await addTrip(trip);
                if (response.success) {
                  if (
                    shouldUpdate({
                      startDate,
                      endDate,
                      vehicleId: vehicleIdMain,
                      driverId: driverIdMain,
                      Trip: response.data!,
                    })
                  ) {
                    mutate({
                      success: true,
                      message: "Trip added successfully",
                      data: [...trips!, response.data!],
                    });
                  }
                }
                toast({
                  title: response.message,
                  description: response.description,
                });
              } catch (error) {
                toast({
                  title: "Failed to add trip",
                });
              } finally {
                router.replace("/trips");
                setIsLoading(false);
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
