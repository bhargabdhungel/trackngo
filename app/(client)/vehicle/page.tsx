import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import getAll from "@/app/actions/vehicle/getAll";
import Link from "next/link";

export default async function Commands() {
  const vehicles = await getAll();

  return (
    <div className="flex justify-center h-full items-center">
      <div className="w-5/6">
        <Command className="rounded-lg border shadow-md h-fit">
          <CommandInput placeholder="Type vehicle name to search" />
          <CommandList>
            <CommandEmpty>No Vehicles Found</CommandEmpty>
            <CommandGroup heading="vehicles">
              {vehicles.map((vehicle) => (
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
