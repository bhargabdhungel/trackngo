import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import getAll from "@/app/actions/bus/getAll";

export default async function CommandDemo() {
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
                <CommandItem key={vehicle.id}>
                  <span>{vehicle.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
