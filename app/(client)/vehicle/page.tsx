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
import { useRecoilState } from "recoil";
import { vehiclesAtom } from "@/atoms/vehicle";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import { useState } from "react";
import Loading from "@/components/loading";
import useFetchData from "@/hooks/useFetchData";

export default function Commands() {
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useRecoilState(vehiclesAtom);
  const shouldRun = vehicles ? false : true;
  useFetchData(shouldRun, setVehicles, getAllVehicles, setLoading);
  if (loading) return <Loading />;

  return (
    <div className="flex justify-center h-full items-center">
      <div className="w-5/6">
        <Command className="rounded-lg border shadow-md h-fit">
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
      </div>
    </div>
  );
}
