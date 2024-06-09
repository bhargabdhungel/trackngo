"use client";

import { LucidePersonStanding, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { tripsAtom } from "@/atoms/trip";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { vehiclesAtom } from "@/atoms/vehicle";
import { driversAtom } from "@/atoms/driver";
import Link from "next/link";
import { updateTrip } from "@/lib/updateTrips";

export default function TripDetails() {
  const trips = useRecoilValue(tripsAtom);
  const vehicles = useRecoilValue(vehiclesAtom);
  const drivers = useRecoilValue(driversAtom);
  const router = useRouter();
  useEffect(() => {
    if (!trips || !vehicles || !drivers) router.replace("/trip");
  }, [router, trips, vehicles, drivers]);

  const tripId = parseInt(usePathname().split("/").pop() as string, 10);

  const trip = useMemo(
    () => trips?.find((trip) => trip.id === tripId),
    [trips, tripId]
  );
  const vehicle = useMemo(
    () => vehicles?.find((vehicle) => vehicle.id === trip?.busId),
    [vehicles, trip]
  );
  const driver = useMemo(
    () => drivers?.find((driver) => driver.id === trip?.driverId),
    [drivers, trip]
  );

  const updatedTrip = useMemo(() => updateTrip(trip!), [trip]);

  if (!trip || !vehicle || !driver || !updatedTrip) return null;

  const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="flex justify-center items-center h-full p-8">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center text-lg">
              <Link href={`/driver/${driver.id}`}>
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  {driver.name}
                </span>
              </Link>
            </CardTitle>
            <CardDescription>
              Date: {formatDate(trip.startTime)}
            </CardDescription>
          </div>
          <div className="ml-auto flex flex-col items-center gap-1 pl-4">
            <Link href={`/vehicle/${updatedTrip.busId}`}>
              <Button size="sm" variant="outline" className="h-8 w-36 gap-1">
                <Truck className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Vehicle Details
                </span>
              </Button>
            </Link>
            <Link href={`/driver/${updatedTrip.driverId}`}>
              <Button size="sm" variant="outline" className="h-8 w-36 gap-1">
                <LucidePersonStanding className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Driver Details
                </span>
              </Button>
            </Link>
            {/* <Button size="sm" variant="outline" className="h-8 gap-1">
              <Truck className="h-3.5 w-3.5" />
              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                View Vehicle
              </span>
            </Button> */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Trash</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Trip Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Start Location</span>
                <span>{updatedTrip.routeFrom}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">End Location</span>
                <span>{updatedTrip.routeTo}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Start Time</span>
                <span>{updatedTrip.startTime as string}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">End Time</span>
                <span>{updatedTrip.endTime as string}</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <div className="font-semibold">Trip Summary</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Fare</span>
                <span>{updatedTrip.fare}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Fuel</span>
                <span> {updatedTrip.fuelCost}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Maintenance</span>
                <span>{updatedTrip.maintenanceCost}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Other Expenses</span>
                <span>{updatedTrip.otherCost}</span>
              </li>
              <li className="flex items-center justify-between font-bold">
                <span className="text-muted-foreground">Balance</span>
                <span>{updatedTrip.balance}</span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <div className="font-semibold">Driver Name</div>
              <address className="grid gap-0.5 not-italic text-muted-foreground">
                <span>{driver.name}</span>
              </address>
            </div>
            <div className="grid auto-rows-max gap-3">
              <div className="font-semibold">Contact</div>
              <div className="text-muted-foreground">{driver.contact}</div>
            </div>
          </div>
          {/* <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Customer Information</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Customer</dt>
                <dd>Liam Johnson</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href="mailto:">liam@acme.com</a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>
                  <a href="tel:">+1 234 567 890</a>
                </dd>
              </div>
            </dl>
          </div> */}
          {/* <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Payment Information</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Visa
                </dt>
                <dd>**** **** **** 4532</dd>
              </div>
            </dl>
          </div> */}
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            {/* Updated <time dateTime="2023-11-23">November 23, 2023</time> */}
            {/* Updated{" "} */}
            {/* <time>{format(updatedTrip.updatedAt, "dd/MM/yy, hh:mm a")}</time> */}
            @ tracked by TracknGo
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
