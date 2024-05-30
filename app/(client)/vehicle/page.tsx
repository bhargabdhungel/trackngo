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
import { useRecoilState, useSetRecoilState } from "recoil";
import { vehiclesAtom } from "@/atoms/vehicle";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import { useState } from "react";
import Loading from "@/components/loading";
import useFetchData from "@/hooks/useFetchData";
import { Button } from "@/components/ui/button";

export default function Commands() {
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useRecoilState(vehiclesAtom);
  const shouldRun = vehicles ? false : true;
  useFetchData(shouldRun, setVehicles, getAllVehicles, setLoading);
  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-8 h-full items-center">
      <Command className="rounded-lg border shadow-md h-fit mt-8">
        <CommandInput placeholder="Type vehicle name to search" />
        <CommandList>
          <CommandEmpty>No Vehicles Found</CommandEmpty>
          <CommandGroup heading="vehicles">
            {vehicles &&
              vehicles.map((vehicle) => (
                <Link key={vehicle.id} href={`/vehicle/${vehicle.id}`}>
                  <CommandItem className="p-2 text-xl cursor-pointer">
                    <span>{vehicle.name}</span>
                  </CommandItem>
                </Link>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>

      <Link href="/vehicle/addnew">
        <Button>Add New Vehicle</Button>
      </Link>
    </div>
  );
}
