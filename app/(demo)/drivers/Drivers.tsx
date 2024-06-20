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
import getAllDrivers from "@/app/actions/driver/getAll";
import { Button } from "@/components/ui/button";
import useData from "@/hooks/useData";
import Loading from "@/app/loading";

export default function DriversPage() {
  const { data: drivers, isLoading } = useData(getAllDrivers, "getAllDrivers");
  if (isLoading) return <Loading />;

  return (
    <div className="h-[calc(100vh-112px)] mx-auto gap-4 justify-around flex flex-col w-1/2 items-center py-2">
      <Command className="rounded-lg border shadow-md h-fit mt-8">
        <CommandInput placeholder="Type driver name to search" />
        <CommandList>
          <CommandEmpty>No Drivers Found</CommandEmpty>
          <CommandGroup heading="drivers">
            {drivers &&
              drivers.map((driver) => (
                <Link key={driver.id} href={`/drivers/${driver.id}`}>
                  <CommandItem className="p-2 text-xl cursor-pointer">
                    <span>{driver.name}</span>
                  </CommandItem>
                </Link>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>

      <Link href="/drivers/new">
        <Button>Add New Driver</Button>
      </Link>
    </div>
  );
}
