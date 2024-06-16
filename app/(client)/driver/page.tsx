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
import { useEffect, useState } from "react";
import { driversAtom } from "@/atoms/driver";
import getAllDrivers from "@/app/actions/driver/getAll";
import useFetchData from "@/hooks/useFetchData";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";

export default function DriversPage() {
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useRecoilState(driversAtom);
  const shouldRun = drivers ? false : true;
  useFetchData(shouldRun, setDrivers, getAllDrivers, setLoading);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-8 h-full items-center">
      <Command className="rounded-lg border shadow-md h-fit mt-8">
        <CommandInput placeholder="Type driver name to search" />
        <CommandList>
          <CommandEmpty>No Drivers Found</CommandEmpty>
          <CommandGroup heading="drivers">
            {drivers &&
              drivers.map((driver) => (
                <Link key={driver.id} href={`/driver/${driver.id}`}>
                  <CommandItem className="p-2 text-xl cursor-pointer">
                    <span>{driver.name}</span>
                  </CommandItem>
                </Link>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>

      <Link href="/driver/addnew">
        <Button>Add New Driver</Button>
      </Link>
    </div>
  );
}
