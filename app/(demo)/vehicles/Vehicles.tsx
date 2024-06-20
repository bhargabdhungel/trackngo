"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import useData from "@/hooks/useData";

export default function VehilesPage() {
  const { data: vehicles, isLoading } = useData(
    getAllVehicles,
    "getAllVehicles"
  );
  if (isLoading) return <Loading />;
  return (
    <div className="h-[calc(100vh-112px)] mx-auto gap-4 justify-around flex flex-col w-1/2 items-center py-2">
      <Command className="rounded-lg border shadow-md h-fit mt-8">
        <CommandInput placeholder="Type vehicle name to search" />
        <CommandList>
          <CommandEmpty>No Vehicles Found</CommandEmpty>
          <CommandGroup heading="vehicles">
            {vehicles &&
              vehicles.map((vehicle) => (
                <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`}>
                  <CommandItem className="p-2 text-xl cursor-pointer">
                    <span>{vehicle.name}</span>
                  </CommandItem>
                </Link>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>

      <Link href="/vehicles/new">
        <Button>Add New Vehicle</Button>
      </Link>
    </div>
  );
}
